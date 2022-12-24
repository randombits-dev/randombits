const REMOTE_ENTRY_FILE = 'remoteEntry.js';

declare global {
  const RANDOMBITS_CONFIG: any;

  const __webpack_init_sharing__: (parameter: string) => Promise<void>;
  const __webpack_share_scopes__: { default: any };
  const __webpack_require__: { l: (url: string, cb: (event: any) => void, id: string) => {} };
}

const loadRemote = (url: string, scope: string) =>
  new Promise<void>((resolve, reject) => {
    const timestamp = `?t=${new Date().getTime()}`;
    __webpack_require__.l(
      `${url}${timestamp}`,
      (event) => {
        if (event?.type === 'load') {
          return resolve();
        }
        const realSrc = event?.target?.src;
        const error = new Error();
        error.message = 'Loading script failed.\n(missing: ' + realSrc + ')';
        error.name = 'ScriptExternalLoadError';
        reject(error);
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

export const importRemoteWithParams = async <T>(url: string, scope: string, module: string): Promise<T> => {
  if (!window[scope]) {
    // Load the remote and initialize the share scope if it's empty
    await Promise.all([loadRemote(`${url}/${REMOTE_ENTRY_FILE}`, scope), initSharing()]);
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

export const importRemote = (name: string) => {
  const url = RANDOMBITS_CONFIG[`RANDOMBITS_REMOTE_${name.toUpperCase()}`];
  return importRemoteWithParams(url, name, 'bootstrap');
};
