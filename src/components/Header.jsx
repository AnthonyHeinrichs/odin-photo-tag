import { useTheme } from "./ThemeContext";
import nintendoCard from "/nintendo64-card.png";
import moonIcon from "/moon-icon.png";
import sunIcon from "/sun-icon.png";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`header header__${theme}`}>
      <img className="header__logo" src={nintendoCard} alt="nintendo-64" />
      <div className={`header__title header__title__${theme}`}>
        <h1 className="header__title__main">Hidden</h1>
        <p className="header__title__subtitle">(A photo tagging game)</p>
      </div>
      <div className={`header__theme ${theme === 'dark_theme' ? 'dark' : 'light'}`} onClick={toggleTheme}>
        <img className="header__theme__icon" src={theme === 'dark_theme' ? sunIcon : moonIcon} alt="theme-switch" />
      </div>
    </div>
  );
}

export default Header;
