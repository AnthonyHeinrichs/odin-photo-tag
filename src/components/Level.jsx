import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import AddScoreForm from './AddScore';

const Level = ({
  game,
  image,
  altImage,
  handleImageLoad,
  handleTargetBoxClick,
  handleCharacterSelection,
  handleWin,
  dropdownVisible,
  dropdownPosition,
  characters,
}) => {
  const [sec, setSec] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    let timer;

    if (gameStart) {
      timer = setInterval(() => {
        setSec((prevsec) => prevsec + 0.1);
      }, 100);

      if (characters.length === 0) {
        clearInterval(timer);
        setGameOver(true);
        handleWin(sec.toFixed(2));
      }
    }

    return () => clearInterval(timer);
  }, [sec, gameStart]);

  const handleGameStart = () => {
    setGameStart(true);
  };

  return (
    <>
      {!gameOver && (
        <div
          className="game__page"
          style={{ display: gameStart ? 'block' : 'none' }}
        >
          <div className="search">
            <img
              className="search__img"
              src={image}
              alt={altImage}
              onLoad={handleImageLoad}
              onClick={handleTargetBoxClick}
            />
            <div
              className="search__characters"
              style={{
                top: 2 + scrollY,
                left: 2 + scrollX,
                transition: 'top 0.3s ease-in-out, left 0.3s ease-in-out',
              }}
            >
              {characters.map((character) => (
                <img
                  key={character.name}
                  className="character"
                  src={character.image}
                  alt={character.name}
                ></img>
              ))}
            </div>
          </div>
          {dropdownVisible && (
            <div
              className="dropdown"
              style={{
                left: dropdownPosition.x + 10,
                top: dropdownPosition.y + 55,
              }}
            >
              <div className="dropdown__characters">
                {characters.map((character, index) => (
                  <img
                    key={index}
                    className="character"
                    src={character.image}
                    alt={character.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCharacterSelection(character.name);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {gameOver && <AddScoreForm level={game} time={sec.toFixed(2)} />}
      {!gameStart && (
        <div className="start">
          <div className="start__box">
            <p className={`start__text start__text__${theme}`}>Find these characters</p>
            <div>
              {characters.map((character) => (
                <img
                  key={character.name}
                  className="character"
                  src={character.image}
                  alt={character.name}
                ></img>
              ))}
            </div>
            <button className="start__btn" onClick={handleGameStart}>
              Let's go!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Level;
