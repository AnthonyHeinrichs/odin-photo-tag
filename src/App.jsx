import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./components/ThemeContext";
import "./styles/App.scss";
import Header from "./components/Header";
import GameCard from "./components/GameCard";
import nintendoCard from "/nintendo64-card.png";
import prehistoriaCard from "/prehistoria-card.png";
import dragonIslandCard from "/dragon-island-card.png";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <Header theme={theme}/>
      <main className={`main main__${theme}`}>
        <h1  className="title">Choose a Level</h1>
        <div className="games">
          <Link className={`games__link games__link_${theme}`} to="/game/nintendo">
            <GameCard 
            image={nintendoCard} 
            alt="nintendo-64" 
            title="Nintendo 64" 
            difficulty="Easy"
            />
          </Link>
          <Link className={`games__link games__link_${theme}`} to="/game/prehistoria">
            <GameCard 
            image={prehistoriaCard} 
            alt="prehistoria" 
            title="Prehistoria" 
            difficulty="Medium"
            />
          </Link>
          <Link className={`games__link games__link_${theme}`} to="/game/dragon">
            <GameCard 
            image={dragonIslandCard} 
            alt="dragon-island" 
            title="Dragon Charmer's Island" 
            difficulty="Hard"
            />
          </Link>
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
