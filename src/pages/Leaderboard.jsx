import { useState, useEffect } from 'react';
import Header from '../components/Header';
import nintendoCard from '/nintendo64-card.png'; 
import prehistoriaCard from '/levels/prehistoria/prehistoria-card.png'; // Update paths
import dragonIslandCard from '/dragon-island-card.png'; 
import '../styles/Leaderboard.scss'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({
    prehistoria: [],
    'dragon Island': [],
    nintendo: [],
  });

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
          { prehistoria: [], 'dragon Island': [], nintendo: [] }
        );
        setLeaderboardData({
          prehistoria: organizedData.prehistoria
            .sort((a, b) => b.score - a.score)
            .slice(0, 10),
          'dragon Island': organizedData['dragon Island']
            .sort((a, b) => b.score - a.score)
            .slice(0, 10),
          nintendo: organizedData.nintendo
            .sort((a, b) => b.score - a.score)
            .slice(0, 10),
        });
      } catch (error) {
        console.error('Error fetching highscore data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h1>Leaderboard</h1>
      <div className='leaderboard_levels'>
        {Object.entries(leaderboardData).map(([level, scores]) => (
          <div key={level}>
            <img
              src={
                level === 'prehistoria'
                  ? prehistoriaCard
                  : level === 'dragon Island'
                  ? dragonIslandCard
                  : nintendoCard
              }
              className='leaderboard_levels__imgs'
              alt={level}
            ></img>
            <h2>{level.charAt(0).toUpperCase() + level.slice(1)}</h2>
            <ol>
              {scores.map((score) => (
                <li key={score._id}>
                  {score.name} - {score.time}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </>
  );
};

export default Leaderboard;
