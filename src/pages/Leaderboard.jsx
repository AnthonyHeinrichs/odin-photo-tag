import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import Header from '../components/Header';
import oliverCityCard from '/levels/oliver-city/oliver-city-card.png';
import prehistoriaCard from '/levels/prehistoria/prehistoria-card.png'; // Update paths
import dragonIslandCard from '/levels/dragon-island/dragon-island-card.png';
import '../styles/Leaderboard.scss';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({
    prehistoria: [],
    'Dragon Island': [],
    'Oliver City': [],
  });
  const [selectedLevel, setSelectedLevel] = useState('prehistoria');

  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('http://localhost:5000/leaderboard', {
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
          prehistoria: organizedData.prehistoria
            .sort((a, b) => b.score - a.score)
            .slice(0, 10),
          'Dragon Island': organizedData.dragon
            .sort((a, b) => b.score - a.score)
            .slice(0, 10),
          'Oliver City': organizedData.oliver
            .sort((a, b) => b.score - a.score)
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
    <div className={`leaderboard main__${theme}`}>
      <Header />
      <h1 className='leaderboard_title'>Leaderboard</h1>
      <div className="leaderboard_levels">
        {Object.entries(leaderboardData).map(([level, scores]) => (
          <div
            key={level}
            className={`leaderboard_level ${
              selectedLevel === level
                ? 'leaderboard_level__selected'
                : 'leaderboard_level__not_selected'
            }`}
          >
            <img
              src={
                level === 'prehistoria'
                  ? prehistoriaCard
                  : level === 'Dragon Island'
                  ? dragonIslandCard
                  : oliverCityCard
              }
              className="leaderboard_level__imgs"
              onClick={() => handleLevelSelection(level)}
              alt={level}
            ></img>
            <h2 className="leaderboard_level__title">
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </h2>
          </div>
        ))}
      </div>
      <div className="leaderboard_scores">
        <ol>
          {leaderboardData[selectedLevel].map((score) => (
            <li key={score._id}>
              {score.name} - {score.time}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;
