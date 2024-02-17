import { useState } from 'react';
import { useTheme } from './components/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import CustomLink from './components/CustomLink';
import Header from './components/Header';
import GameCard from './components/GameCard';
import oliverCityCard from '/levels/oliver-city/oliver-city-card.png';
import prehistoriaCard from '/levels/prehistoria/prehistoria-card.png';
import dragonIslandCard from '/levels/dragon-island/dragon-island-card.png';
import './styles/App.scss';

function App() {
  const [exit, setExit] = useState(false);

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
      title: 'Dragon Island',
      difficulty: 'Hard',
    },
  };

  return (
    <div className={`app_main main__${theme}`}>
      <Header theme={theme} />
      <AnimatePresence>
        {!exit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="title">Choose a Level</h1>
            <div className="games">
              {Object.keys(levelData).map((levelName) => (
                <CustomLink
                  key={levelName}
                  className={`games__link games__link_${theme}`}
                  dest={levelData[levelName].path}
                  setExit={setExit}
                  content={
                    <GameCard
                      image={levelData[levelName].image}
                      alt={levelData[levelName].alt}
                      title={levelData[levelName].title}
                      difficulty={levelData[levelName].difficulty}
                    />
                  }
                />
              ))}
            </div>
            <div className="leaderboard_link">
              <div>
                <CustomLink
                  dest={'/leaderboard'}
                  content={'View Leaderboard'}
                  setExit={setExit}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
