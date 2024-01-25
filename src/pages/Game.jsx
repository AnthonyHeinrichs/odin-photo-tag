import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameHeader from "../components/GameHeader"
import Nintendo64 from "/nintendo64.png";
import Prehistoria from "/prehistoria.png";
import DragonIsland from "/dragon-island.png";
import "../styles/Game.scss";

const Game = () => {
  const [timer, setTimer] = useState(0);

  const { name } = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {name === "nintendo" ? (
        <>
          <GameHeader game={name} timer={timer.toFixed()} />
          <div className="search">
            <img className="search__img" src={Nintendo64} alt="nintendo-game" />
          </div>
        </>
      ) : name === "prehistoria" ? (
        <>
          <GameHeader game={name} timer={timer.toFixed()} />
          <div className="search">
            <img className="search__img" src={Prehistoria} alt="prehistoria-game" />
          </div>
        </>
      ) : name === "dragon" ? (
        <>
          <GameHeader game={name} timer={timer.toFixed()} />
          <div className="search">
            <img className="search__img" src={DragonIsland} alt="dragon-island-game" />
          </div>
        </>
      ) : (
        <h1>{name} is not a game.</h1>
      )}
    </>
  )
}

export default Game;