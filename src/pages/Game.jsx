import { useParams } from "react-router-dom";
import GameHeader from "../components/GameHeader"

const Game = () => {
  const { name } = useParams();

  return (
    <>
      {name === "nintendo" ? (
        <GameHeader game={name} />
      ) : name === "prehistoria" ? (
        <GameHeader game={name} />
      ) : name === "dragon" ? (
        <GameHeader game={name} />
      ) : (
        <h1>{name} is not a game.</h1>
      )}
    </>
  )
}

export default Game;