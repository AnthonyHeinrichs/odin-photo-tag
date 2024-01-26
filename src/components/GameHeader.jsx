
const GameOne = ({game, timer}) => {
  return (
    <div className="game__header">
      <h1>{game}</h1>
      <p>{timer} seconds</p>
    </div>
  )
}

export default GameOne;