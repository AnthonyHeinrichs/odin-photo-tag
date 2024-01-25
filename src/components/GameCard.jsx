import { useTheme } from "./ThemeContext";
import "../styles/GameCard.scss";

const GameCard = ({image, alt, title, difficulty}) => {
  const { theme } = useTheme();

  return (
    <div className={`game game__${theme}`}>
      <img className="game__image" src={image} alt={alt}/>
      <h4 className="game__title">{title}</h4>
      <p className="game__difficulty">{difficulty}</p>
    </div>
  )
}

export default GameCard;