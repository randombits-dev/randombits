import {createSignal, onMount} from "solid-js";
import '@/styles/theme-changer.scss';

const THEME_LIST = [
    {id: "base", name: "Bumble"},
    {id: "daring", name: "Iron"},
    {id: "camo", name: "Camo"},
    {id: "bold", name: "Bold"},
    {id: "gray", name: "Overcast"},
    {id: "dark-metal", name: "Dusk"},
    {id: "dark-fear", name: "Midnight"},
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
        <div class="static md:fixed w-full bottom-[-21px] text-center z-20">
        <div class="rb-theme-changer inline-block md:rounded-t-xl overflow-hidden bg-header text-header-text">
            {THEME_LIST.map((theme) => {
                const btnClasses = "rounded-none inline-block px-5 py-3 mb-4 justify-center font-bold";
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
