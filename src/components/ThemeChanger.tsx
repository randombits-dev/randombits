import {createSignal} from "solid-js";
import {isSSR} from "../utils/utils";

const themes = [
    {id: "camo", name: "Camo"},
    {id: "clay", name: "Clay"},
    {id: "rust", name: "Rust"},
    {id: "blue", name: "Blue"},
    {id: "daring", name: "Daring"},
    {id: "green", name: "Green"},
    {id: "bubble", name: "Bubblegum"},
    {id: "bee", name: "Buzz"},
    {id: "dark", name: "Metallic"},
    {id: "strawberry", name: "Strawberry"},
];

const initialTheme = isSSR() ? '' : localStorage.getItem("theme") || 'one';

const ThemeChanger = () => {
    const [currentTheme, setCurrentTheme] = createSignal(initialTheme);

    const changeTheme = (value: string) => {
        document.documentElement.classList.remove(`theme-${currentTheme()}`);

        setCurrentTheme(value);
        document.documentElement.classList.add(`theme-${value}`);
        localStorage.setItem("theme", value);
    };

    return (
        <div class="theme-changer">
            {themes.map((theme, i) => {
                let className = `theme-${theme.id}-btn `;
                if (currentTheme() === theme.id) {
                    className += " theme-active-btn";
                }
                return (
                    <button class={className} onClick={() => changeTheme(theme.id)}>
                        {theme.name}
                    </button>
                );
            })}
        </div>
    );
};

export default ThemeChanger;
