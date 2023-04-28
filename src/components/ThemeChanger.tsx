import { createSignal } from "solid-js";

const themes = [
  { id: "one", name: "Inspire" },
  { id: "two", name: "Bubble Gum" },
  { id: "bee", name: "Buzz Buzz" },
  { id: "dark", name: "Metallic" },
];

const initialTheme = localStorage.getItem("theme") || "one";

const ThemeChanger = () => {
  const [currentTheme, setCurrentTheme] = createSignal(initialTheme);

  const changeTheme = (value: string) => {
    console.log(`${currentTheme()} -> ${value}`);
    document.body.classList.remove(`theme-${currentTheme()}`);

    setCurrentTheme(value);
    document.body.classList.add(`theme-${value}`);
    localStorage.setItem("theme", value);
  };

  return (
    // <select
    //   class="theme-changer-2"
    //   onChange={(e) => changeTheme(e.target.value)}
    // >
    //   {themes.map((theme) => {
    //     if (currentTheme() === theme) {
    //       return (
    //         <option selected={true} onSelect={() => changeTheme(theme)}>
    //           {theme}
    //         </option>
    //       );
    //     }
    //     return <option onSelect={() => changeTheme(theme)}>{theme}</option>;
    //   })}
    // </select>
    <div class="theme-changer">
      {/*<div class="theme-changer-container">*/}
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
      {/*</div>*/}
    </div>
  );
};

export default ThemeChanger;
