import { useParams } from "react-router-dom";
import GameOne from "../components/GameOne"

const Game = () => {
  const { name } = useParams();

  return (
    <>
      <h1>Game page</h1>
      {name === "waldo" ? (
        <GameOne />
      ) : (
        <h2>No game</h2>
      )}
    </>
  )
}

export default Game;