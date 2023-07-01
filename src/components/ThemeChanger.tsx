import {createSignal, onMount} from "solid-js";
import '../styles/theme-changer.css';

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
        <div class="fixed w-full bottom-[-20px] text-center z-20">
        <div class="rb-theme-changer inline-block rounded-t-xl overflow-hidden bg-primary text-primary-text">
            {THEME_LIST.map((theme) => {
                const btnClasses = "rounded-none first:rounded-tl-md inline-block px-5 py-3 mb-4 justify-center font-bold";
                if (currentTheme() === theme.id) {
                    return (
                        <button class={btnClasses + ' rb-theme-active'}>
                            {theme.name}
                        </button>
                    );
                } else {
                    return (
                        <button class={btnClasses} onClick={() => changeTheme(theme)}>
                            {theme.name}
                        </button>
                    );
                }

            })}
        </div>
        </div>
    );
};

export default ThemeChanger;
