import { createSignal } from "solid-js";

const themes = ["one", "two", "bee"];

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
    <div class="theme-changer">
      <div class="theme-changer-container">
        {themes.map((theme) => {
          let className = `theme-${theme}-btn`;
          if (currentTheme() === theme) {
            className += " theme-active-btn";
          }
          return (
            <button class={className} onClick={() => changeTheme(theme)}>
              <div class="theme-box"></div>
              <div class="theme-box"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeChanger;
