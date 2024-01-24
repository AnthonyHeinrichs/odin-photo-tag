import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";
import headerIcon from "/tag-icon.svg";
import moonIcon from "/moon-icon.png";
import sunIcon from "/sun-icon.png";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`header header__${theme}`}>
      <Link to="/">
        <img className="header__logo" src={headerIcon} alt="nintendo-64" />
      </Link>
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
