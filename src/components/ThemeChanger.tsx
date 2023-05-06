import {createSignal} from "solid-js";

const themes = [
    {id: "base", name: "Peach"},
    {id: "fruity", name: "Fruity"},
    {id: "clay", name: "Clay"},
    {id: "camo", name: "Camo"},
    {id: "strawberry", name: "Berry"},
    {id: "pine", name: "Pine"},
    {id: "bee", name: "Buzz"},
    {id: "daring", name: "Dare"},
    {id: "dusk", name: "Dusk", dark: true},
    {id: "rust", name: "Rust", dark: true},
    {id: "metal", name: "Metal", dark: true},
];

const initialTheme = localStorage.getItem("theme") || 'base';

const ThemeChanger = () => {
    const [currentTheme, setCurrentTheme] = createSignal('');

    const changeTheme = (newTheme: any) => {
        const htmlClass = document.documentElement.classList;
        htmlClass.remove(`theme-${currentTheme()}`, 'theme-dark');

        setCurrentTheme(newTheme.id);
        if (newTheme.dark) {
            htmlClass.add(`theme-${newTheme.id}`, 'theme-dark');
        } else {
            htmlClass.add(`theme-${newTheme.id}`);
        }
        localStorage.setItem("theme", newTheme.id);
    };

    queueMicrotask(() => {
        setCurrentTheme(initialTheme);
    });

    return (
        <div class="theme-changer">
            {themes.map((theme) => {
                if (currentTheme() === theme.id) {
                    return (
                        <button class="theme-active-btn">
                            {theme.name}
                        </button>
                    );
                } else {
                    return (
                        <button onClick={() => changeTheme(theme)}>
                            {theme.name}
                        </button>
                    );
                }

            })}
        </div>
    );
};

export default ThemeChanger;
