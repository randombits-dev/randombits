import {createSignal, onMount} from "solid-js";

const THEME_LIST = [
    {id: "base", name: "Fruity"},
    // {id: "clay", name: "Clay"},
    // {id: "camo", name: "Camo"},
    // {id: "strawberry", name: "Berry"},
    {id: "gray", name: "Overcast"},
    {id: "daring", name: "Dare"},
    {id: "bee", name: "Buzz"},
    {id: "dark-metal", name: "Metal"},
    {id: "dark-fear", name: "Fear"},
    {id: "bold", name: "Bold"},
];
const initialTheme = localStorage.getItem("theme") || 'base';

const ThemeChanger = () => {
    const [currentTheme, setCurrentTheme] = createSignal('');

    const changeTheme = (newTheme: any) => {
        const htmlClass = document.documentElement.classList;
        htmlClass.remove(`theme-${currentTheme()}`, 'theme-dark');

        setCurrentTheme(newTheme.id);
        if (newTheme.id.startsWith('dark-')) {
            document.documentElement.classList.add(`theme-${newTheme.id}`, `theme-dark`);
        } else {
            document.documentElement.classList.add(`theme-${newTheme.id}`);
        }
        localStorage.setItem("theme", newTheme.id);
    };

    onMount(() => {
        setCurrentTheme(initialTheme);
    });

    return (
        <div class="theme-changer">
            {THEME_LIST.map((theme) => {
                if (currentTheme() === theme.id) {
                    return (
                        <div class="theme-active">
                            {theme.name}
                        </div>
                    );
                } else {
                    return (
                        <div onClick={() => changeTheme(theme)}>
                            {theme.name}
                        </div>
                    );
                }

            })}
        </div>
    );
};

export default ThemeChanger;
