import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './components/ThemeContext';
import './styles/App.scss';
import Header from './components/Header';
import GameCard from './components/GameCard';
import oliverCityCard from '/levels/oliver-city/oliver-city-card.png';
import prehistoriaCard from '/levels/prehistoria/prehistoria-card.png';
import dragonIslandCard from '/levels/dragon-island/dragon-island-card.png';

function App() {
  const { theme } = useTheme();

  const levelData = {
    oliver: {
      path: '/game/oliver',
      image: oliverCityCard,
      alt: 'oliver-city',
      title: 'Oliver City',
      difficulty: 'Easy',
    },
    prehistoria: {
      path: '/game/prehistoria',
      image: prehistoriaCard,
      alt: 'prehistoria',
      title: 'Prehistoria',
      difficulty: 'Medium',
    },
    dragon: {
      path: '/game/dragon',
      image: dragonIslandCard,
      alt: 'dragon-island',
      title: "Dragon Charmer's Island",
      difficulty: 'Hard',
    },
  };

  return (
    <div className={`app_main main__${theme}`}>
      <Header theme={theme} />
      <main className="main">
        <h1 className="title">Choose a Level</h1>
        <div className="games">
          {Object.keys(levelData).map((levelName) => (
            <Link
              key={levelName}
              className={`games__link games__link_${theme}`}
              to={levelData[levelName].path}
            >
              <GameCard
                image={levelData[levelName].image}
                alt={levelData[levelName].alt}
                title={levelData[levelName].title}
                difficulty={levelData[levelName].difficulty}
              />
            </Link>
          ))}
        </div>
        <div className="leaderboard_title">
          <Link to="/leaderboard">
            <h4>View Leaderboard</h4>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default App;
