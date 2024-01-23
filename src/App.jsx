import "./App.scss";
import nintendoCard from "/nintendo64-card.png";
import prehistoriaCard from "/prehistoria-card.png";
import dragonIslandCard from "/dragon-island-card.png";

function App() {

  return (
    <>
      <h1  className="title">Choose a Game</h1>
      <div className="games">
        <div className="game">
          <img className="game__image" src={nintendoCard} alt="nintendo-64"/>
          <h4>Nintendo 64</h4>
          <p>Easy</p>
        </div>
        <div className="game">
          <img className="game__image" src={prehistoriaCard} alt="prehistoria"/>
          <h4>Prehistoria</h4>
          <p>Medium</p>
        </div>
        <div className="game">
          <img className="game__image" src={dragonIslandCard} alt="dragon-island"/>
          <h4>Dragon Charmer's Island</h4>
          <p>Hard</p>
        </div>
      </div>
    </>
  )
}

export default App
