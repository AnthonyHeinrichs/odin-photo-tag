import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameHeader from "../components/GameHeader"

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
        <GameHeader game={name} timer={timer.toFixed()} />
      ) : name === "prehistoria" ? (
        <GameHeader game={name} timer={timer.toFixed()} />
      ) : name === "dragon" ? (
        <GameHeader game={name} timer={timer.toFixed()} />
      ) : (
        <h1>{name} is not a game.</h1>
      )}
    </>
  )
}

export default Game;