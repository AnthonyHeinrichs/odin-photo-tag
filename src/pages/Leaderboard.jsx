import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import GameCard from '../components/GameCard';
import Header from '../components/Header';
import oliverCityCard from '/levels/oliver-city/oliver-city-card.png';
import prehistoriaCard from '/levels/prehistoria/prehistoria-card.png';
import dragonIslandCard from '/levels/dragon-island/dragon-island-card.png';
import '../styles/Leaderboard.scss';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({
    'Oliver City': [],
    prehistoria: [],
    'Dragon Island': [],
  });
  const [selectedLevel, setSelectedLevel] = useState('Oliver City');

  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('https://odin-photo-tag-be.vercel.app/leaderboard', {
          headers: {
            'X-API-Key': import.meta.env.VITE_API_KEY,
          },
        });
        const json = await resp.json();
        const organizedData = json.scores.reduce(
          (acc, score) => {
            if (!acc[score.level]) {
              acc[score.level] = [];
            }
            acc[score.level].push(score);
            return acc;
          },
          { prehistoria: [], dragon: [], oliver: [] }
        );
        setLeaderboardData({
          'Oliver City': organizedData.oliver
            .sort((a, b) => a.time - b.time)
            .slice(0, 10),
          prehistoria: organizedData.prehistoria
            .sort((a, b) => a.time - b.time)
            .slice(0, 10),
          'Dragon Island': organizedData.dragon
            .sort((a, b) => a.time - b.time)
            .slice(0, 10),
        });
      } catch (error) {
        console.error('Error fetching highscore data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLevelSelection = (name) => {
    setSelectedLevel(name);
  };

  return (
    <div className={`leaderboard`}>
      <Header />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h1 className="leaderboard_title">Leaderboard</h1>
          <div className="leaderboard_levels">
            {Object.entries(leaderboardData).map(([level]) => (
              <div
                key={level}
                className={`leaderboard_level ${
                  selectedLevel === level
                    ? 'leaderboard_level__selected'
                    : 'leaderboard_level__not_selected'
                }`}
              >
                <div onClick={() => handleLevelSelection(level)}>
                  <GameCard
                    image={
                      level === 'prehistoria'
                        ? prehistoriaCard
                        : level === 'Dragon Island'
                        ? dragonIslandCard
                        : oliverCityCard
                    }
                    alt={level}
                    title={level.charAt(0).toUpperCase() + level.slice(1)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="leaderboard_scores">
            <ol className="leaderboard_scores__list">
              <div
                className={`leaderboard_scores__header leaderboard_scores__header__${theme}`}
              >
                <p className="leaderboard_scores__place">Place</p>
                <p className="leaderboard_scores__name">Name</p>
                <p className="leaderboard_scores__time">Time (min)</p>
              </div>
              {leaderboardData[selectedLevel].map((score, index) => (
                <div
                  className={`leaderboard_score leaderboard_score__${theme}`}
                  key={score._id}
                >
                  <div className="leaderboard_score__place">{index + 1}</div>
                  <div className="leaderboard_score__name">{score.name}</div>
                  <div className="leaderboard_score__time">{score.time}</div>
                </div>
              ))}
            </ol>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Leaderboard;
