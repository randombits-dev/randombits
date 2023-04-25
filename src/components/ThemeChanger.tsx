import {createSignal} from "solid-js";

const ThemeChanger = () => {
    const [currentTheme, setCurrentTheme] = createSignal('one');

    const changeTheme = (value: string) => {
        console.log(`${currentTheme()} -> ${value}`);
        document.body.classList.remove(`theme-${currentTheme()}`);

        setCurrentTheme(value);
        document.body.classList.add(`theme-${value}`);
    };

    return <div>
        <button onClick={() => changeTheme('one')}>One</button>
        <button onClick={() => changeTheme('two')}>Two</button>
    </div>
};

export default ThemeChanger;