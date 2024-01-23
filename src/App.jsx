import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./components/ThemeContext";
import "./App.scss";
import Header from "./components/Header";
import nintendoCard from "/nintendo64-card.png";
import prehistoriaCard from "/prehistoria-card.png";
import dragonIslandCard from "/dragon-island-card.png";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <Header theme={theme}/>
      <main className={`main main__${theme}`}>
        <h1  className="title">Choose a Game</h1>
        <div className="games">
          <div className={`game game__${theme}`}>
            <img className="game__image" src={nintendoCard} alt="nintendo-64"/>
            <h4>Nintendo 64</h4>
            <p>Easy</p>
          </div>
          <div className={`game game__${theme}`}>
            <img className="game__image" src={prehistoriaCard} alt="prehistoria"/>
            <h4>Prehistoria</h4>
            <p>Medium</p>
          </div>
          <div className={`game game__${theme}`}>
            <img className="game__image" src={dragonIslandCard} alt="dragon-island"/>
            <h4>Dragon Charmer's Island</h4>
            <p>Hard</p>
          </div>
        </div>
        <div className="leaderboard">
          <Link to="/leaderboard">
            <h4>View Leaderboard</h4>
          </Link>
        </div>
      </main>
    </>
  )
}

export default App
