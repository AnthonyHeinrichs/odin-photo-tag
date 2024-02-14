import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";
import headerIcon from "/rubik.png";
import moonIcon from "/moon-icon.png";
import sunIcon from "/sun-icon.png";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`header header__${theme}`}>
      <div className="header__title__container">
        <Link to="/">
          <img className="header__logo" src={headerIcon} alt="world-search" />
        </Link>
        <div className="header__title__text">
          <h1 className="header__title__main">Hidden</h1>
          <p className="header__title__subtitle">A photo tagging game</p>
        </div>
      </div>
      <div className={`header__theme ${theme === 'dark_theme' ? 'dark' : 'light'}`} onClick={toggleTheme}>
        <img className="header__theme__icon" src={theme === 'dark_theme' ? sunIcon : moonIcon} alt="theme-switch" />
      </div>
    </div>
  );
}

export default Header;
