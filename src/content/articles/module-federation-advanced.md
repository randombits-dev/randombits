---
title: "Advanced Guide to Module Federation"
summary: "There are plenty of articles about setting up Webpack's Module Federation. But almost all the articles focus on the basics. Here I will go over steps you want to consider in a production app."
desc: "Beyond the basics of module federation to cover what a production app will most likely need. Dynamic Imports, Sharing Files and Libraries, Web Components, Routers, Prefetching, Cache Busting, Dynamic URLS."
updated: 2023-01-01
img: '/images/mf1.png'
---

There are plenty of articles about setting up Webpack's Module Federation.
But almost all the articles focus on the basics.
Here I will go over steps you want to consider in a production app.

## Dynamic Imports

Most examples show using the *remotes* array to specify remote apps:

```javascript
remotes: {
    app1: 'app1@http://localhost:3001/remoteEntry.js'
}
```

This simply tells webpack to fetch *app1* at given address when the container app loads.

There are a few limitations in this approach:

**The *remoteEntry.js* files get fetched immediately when your container app loads.**
This is not ideal if you have a large list of remotes, or you have remotes that will never load for the user.

**The browser may cache the file.**
Since there is not a version or timestamp in the URL, the browser can cache the file, and users will not receive new
deployments immediately.

**Your options for dynamically setting the URL is more limited.**
You may want to change remote urls without needing a redeployment. This could be how you roll out production updates.
Or maybe you need to change the url of the remote depending on the region the user is in.

## Dynamic Imports Script

To implement dynamic imports, you will want to create a utility script like the following:

```typescript
declare global {
    const __webpack_init_sharing__: (parameter: string) => Promise<void>;
    const __webpack_share_scopes__: { default: any };
    const __webpack_require__: { l: (url: string, cb: (event: any) => void, id: string) => {} };
}

const loadRemote = (url: string, scope: string) =>
    new Promise<void>((resolve, reject) => {
        const timestamp = `?t=${new Date().getTime()}`;
        __webpack_require__.l(`${url}${timestamp}`, (event) => {
                if (event?.type === 'load') {
                    resolve();
                } else {
                    reject(new Error(`Loading script failed: ${event?.target?.src}`));
                }
            },
            scope,
        );
    });

const initSharing = async () => {
    if (!__webpack_share_scopes__?.default) {
        await __webpack_init_sharing__('default');
    }
};
const initContainer = async (containerScope: any) => {
    if (!containerScope.__initialized && !containerScope.__initializing) {
        containerScope.__initializing = true;
        await containerScope.init(__webpack_share_scopes__.default);
        containerScope.__initialized = true;
        delete containerScope.__initializing;
    }
};

export const importRemote = async <T>(url: string, scope: string, module: string): Promise<T> => {
    if (!window[scope]) {
        // Load the remote and initialize the share scope if it's empty
        await Promise.all([loadRemote(url, scope), initSharing()]);
        if (!window[scope]) {
            throw new Error(
                `${scope} not found on window object`,
            );
        }
        // Initialize the container to get shared modules and get the module factory:
        const [, moduleFactory] = await Promise.all([
            initContainer(window[scope]),
            window[scope].get(module.startsWith('./') ? module : `./${module}`),
        ]);
        return moduleFactory();
    } else {
        const moduleFactory = await window[scope].get(module.startsWith('./') ? module : `./${module}`);
        return moduleFactory();
    }
};
```

You can then pull in a remote app like:

```typescript
importRemote('http://localhost:3001/remoteEntry.js', 'app1', 'bootstrap').then((result: any) => {
    setArticles(result);
});
```

For reference, here would be the webpack config for the remote app:

```javascript
new ModuleFederationPlugin({
    name: "app1",
    filename: "remoteEntry.js",
    exposes: {
        './bootstrap': './src/bootstrap'
    }
})
```

If you store your remote urls in environment variables or another method of configuration, you can then make a helper
function:

```typescript
export const importRemoteByName = (remoteName: string, module = 'bootstrap') => {
    const url = REMOTE_URLS[remoteName] + '/remoteEntry.js';
    return importRemote(url, remoteName, module);
};
```

> When using dynamic imports, you don't even have to use the ModuleFederationPlugin in your top level app.
> Although you still may want to if you are sharing dependencies.

## Shared Libraries

Sharing dependencies between apps is easy. Simply load the dependencies from package.json, and then pass the list to
module federation:

```javascript
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: "app1",
            filename: "remoteEntry.js",
            shared: {
                ...deps
            }
        })
    ]
}
```

Any libraries that need to be **singletons** (can only be initialized once), can be declared as such.
This is overriding the **react** dependency from package.json:

```javascript
new ModuleFederationPlugin({
    name: "app1",
    filename: "remoteEntry.js",
    shared: {
        ...deps,
        'react': {
            singleton: true,
            requiredVersion: deps.react
        }
    }
})
```

Most notably, **react** and **preact** have to be singletons to work properly.
Also, if preact hooks are used, it also needs to be declared separately, even though they come from the same dependency:

```javascript
new ModuleFederationPlugin({
    name: "app1",
    filename: "remoteEntry.js",
    shared: {
        ...deps,
        'preact': {
            singleton: true,
            requiredVersion: deps.preact
        },
        'preact/hooks': {
            singleton: true,
            requiredVersion: deps.preact
        }
    }
})
```

## Sharing Static Files

You can expose static files like JSON to share with other apps.

```javascript
new ModuleFederationPlugin({
    name: "app1",
    filename: "remoteEntry.js",
    exposes: {
        './bootstrap': './src/bootstrap',
        './metadata': './src/metadata.json'
    }
})
```

To use, simply change the module name:

```typescript
importRemote('http://localhost:3001/remoteEntry.js', 'app1', 'metadata').then((metadata) => {
    console.log(metadata.name);
});
```

Don't worry, remoteEntry.js will **NOT** be fetched every time you call importRemote, it is automatically cached via our
script above.

## Use Web Components

I found that the simplest way to use module federation is to have my remote applications expose web components.

For example, here is my **bootstrap.tsx** file for a remote:

```javascript
if (!window.customElements.get('app1')) {
    class App1 extends HTMLElement {
        private reactRoot: Root = null;

        connectedCallback() {
            this.reactRoot = createRoot(this);
            this.reactRoot.render(<App/>);
        }

        disconnectedCallback() {
            setTimeout(() => {
                this.reactRoot.unmount();
                this.reactRoot = null;
            })
        }
    }

    window.customElements.define('app1', App1);
}
```

This is how my container application loads the remote:

```javascript
const RemoteApp1 = () => {
    useEffect(() => {
        importRemote('http://localhost:3001/remoteEntry.js', 'app1', 'bootstrap');
    }, []);
    return <app1/>;
};
```

That's it!. Because your using web components, you don't need to wait for the remote import to resolve.
You can simply render `<app1/>`, which will be an empty element until the remote app is loaded, and the web component
populates.

Web components also makes it easier to create a generic component that will load remote applications:

```javascript
const RemoteApp = ({appName, params}: Params) => {
    useEffect(() => {
        importRemoteByName(appName).catch((e) => {
            // handle error if needed
        });
    }, []);
    const CustomElement = `remote-${appName}`;
    return <CustomElement {...params}/>;
};
```

## Custom router that resolves remote routes

If you have routes that display a remote application, you will notice that the page is blank for a second before the
application populates.
This is because the route transitions immediately, and the remote application is loaded afterwards.
A better experience would be to load the remote before transitioning to the new route.
And to accomplish this you need to implement a custom router. Don't worry, it's easy.

Say we want the following routes:

```typescript jsx
export const ROUTES = [
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/app1',
        remote: 'app1'
    }
];
```

We can either define an element to render, or a remote application to render.
We can also define both an element and a remote, if we have the scenario where we are rendering a local element that
contains a remote application.
Then we can still preload the remote, and improve the performance.

Here is the router, which defines a context:

```typescript jsx
export interface IRoute {
    path: string;
    element?: JSX.Element;
    remote?: string;
    params?: { [key: string]: any };
}

interface IRouterContext {
    url: string;
    routes: { path: string, element: any }[];
    navigate: (newUrl) => void;
    current: any;
    params: any;
}

const GLOBAL_ROUTE_CONTEXT = {
    url: location.pathname,
    routes: [],
    navigate: null,
    current: null,
    params: {}
};

const RouterContext = createContext<IRouterContext>(GLOBAL_ROUTE_CONTEXT);

export const useRouter = () => {
    return useContext(RouterContext);
};

const Router = ({routes, children}) => {
    const [url, setUrl] = useState(location.pathname);

    const [current, setCurrent] = useState<IRoute>(null);
    const [params, setParams] = useState<any>({});

    const calcRoute = (newUrl) => {
        setUrl(newUrl);
        let newParams;
        const newCurrent = routes.find(child => {
            newParams = routeTest(newUrl, child.path);
            return !!newParams;
        });
        if (current !== newCurrent) {
            if (newCurrent.remote) {
                importRemote(newCurrent.remote).then(() => {
                    setCurrent(newCurrent);
                    setParams(newParams);
                });
            } else {
                setCurrent(newCurrent);
                setParams(newParams);
            }
        }
    };

    const navigate = (newUrl, skipHistory = false) => {
        if (!skipHistory) {
            window.history.pushState({}, null, newUrl);
        }
        calcRoute(newUrl);
    };

    const onPopState = () => {
        navigate(location.pathname, true);
    };

    useEffect(() => {
        window.addEventListener('popstate', onPopState);
        return () => {
            window.removeEventListener('popstate', onPopState);
        }
    }, [current]);

    useEffect(() => {
        calcRoute(url);
    }, []);

    return (
        <RouterContext.Provider value={{url, routes, current, params, navigate}}>{children}</RouterContext.Provider>
    );
}
```

Here is the router outlet component:

```typescript jsx
const getElementToRender = (current: IRoute) => {
    if (current) {
        if (current.element) {
            return current.element;
        } else if (current.remote) {
            return <RemoteApp key={current.path} appName={current.remote} params={current.params}/>;
        }
    }
    return <div>Not found</div>;
};

const RouterOutlet = () => {
    const {current} = useRouter();
    return (
        <OutletContainer id="outlet">{getElementToRender(current)}</OutletContainer>
    );
}
```

Now we can define our main **App.tsx** file:

```typescript jsx
const App = () => {
    return <Router routes={ROUTES}>
        <Header/>
        <RouterOutlet/>
        <Footer/>
    </Router>;
}
```

## Prefetch remotes

If using the dynamic imports script, you could start preloading apps that users are likely to need.
After the app is done loading, you can simply call `importRemote` for each app you want to preload:

```javascript
importRemote('http://localhost:3001/remoteEntry.js', 'app1', 'bootstrap');
importRemote('http://localhost:3002/remoteEntry.js', 'app2', 'bootstrap');
```

## Caching Strategy

Everytime a remote app is loaded, we want to load the latest version of the remote app, but we also want to cache as
much as we can to improve loading time.

The answer to this is always fetching `remoteEntry.js` fresh, and then caching everything else.
If you are using the *dynamic imports script*, the remoteEntry.js file is cache busted through a timestamp in the
request, so it is loaded fresh every time:

```
http://localhost:3002/remoteEntry.js?t=1682726535364
```

This is fine, since remoteEntry.js is very tiny, and only points at the rest of the files to load.

Then, if we make sure to use content hashes for our script names when we build, and mark the files as immutable though
the **Cache-Control** header, the browser will cache everything besides that initial remoteEntry.js.

Webpack output config:

```javascript
output: {
    filename: "[contenthash].js" // d0fb3aa6b14ecb0578b5.js
}
```

Cache-Control header:

```
Cache-Control: public, max-age=31536000, immutable
```

## Dynamic URLs - env variables

I recommend setting your remote application urls in environment variables.
That way you can change the urls for different environments, and you can set them to localhost for development.

Create a *.env* file in your root directory:

```yaml
REMOTE_APP1=https://example.github.io/remote1
REMOTE_APP2=http://localhost:8080/remote2
```

As you can see, I'm fetching remote1 from the production environment, so I don't need to start a local server.
But I want to work on remote2, so I'm pointing it to the local version.

On the server, you would set these environment variables in your CI pipeline (github, vercel, etc).
And when they are set in your CI environment, they take priority over anything in your .env file.
So you can check in the local .env if you wish.

Here is an example of loading the environment variables in webpack:

```javascript
const DefinePlugin = require('webpack/lib/DefinePlugin');
require('dotenv').config();
const remoteVars = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key.indexOf('REMOTE_') === 0));

module.exports = {
    ...,
    plugins: [
        new DefinePlugin({
            'REMOTE_CONFIG': JSON.stringify(remoteVars)
        }),
    ]
}
```

`require('dotenv').config();` loads the environment variables from your *.env* file, and puts them into the
*process.env* object.
Then, instead of hardcoding each variable key in the script, I am grabbing all keys that start with *REMOTE_*.
And finally the *DefinePlugin* will inject the variables into your code.
In this example, I'm injecting an object called *REMOTE_CONFIG*, which would end up getting compiled as a global
variable like:

```javascript
const REMOTE_CONFIG = {
    'REMOTE_APP1': 'https://example.github.io/remote1',
    'REMOTE_APP2': 'http://localhost:8080/remote2'
};
```

Then you can use anywhere in your code:

```javascript
REMOTE_CONFIG[`REMOTE_APP1`]; // https://example.github.io/remote1
```

If your using typescript, make sure to declare the global variable:

```typescript
declare global {
    const REMOTE_CONFIG: { [key: string]: string };
}
```

## Closing Thoughts

Module Federation is a great pattern to use for SPA micro frontends.

This patten is also easy to implement for **SSR** (server side render) webapps, as long as the remote app is the only
app
generated on the server.
It is entirely possible to implement with all remotes coming from SSR, but it gets more complex and I wouldn't recommend
it for that.

It is also not the best option for SSG webapps (static site generation).
