import { useTheme } from "./ThemeContext";
import "../styles/GameCard.scss";

const GameCard = ({image, alt, title, difficulty}) => {
  const { theme } = useTheme();

  return (
    <div className={`game game__${theme}`}>
      <img className="game__image" src={image} alt={alt}/>
      <h4>{title}</h4>
      <p>{difficulty}</p>
    </div>
  )
}

export default GameCard;