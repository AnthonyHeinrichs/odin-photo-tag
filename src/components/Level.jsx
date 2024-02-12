import { useState, useEffect } from 'react';
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

  // Initializing a timer
  useEffect(() => {
    let timer;

    if (gameStart) {
      timer = setInterval(() => {
        setSec((prevSec) => prevSec + 0.1);
      }, 100);
    }

    return () => clearInterval(timer);
  }, [gameStart]);

  useEffect(() => {
    if (characters.length === 0) {
      setGameOver(true);
      handleWin(sec.toFixed(2));
    }
  }, [characters]);

  const handleGameStart = () => {
    setGameStart(true);
  }

  return (
    <>
      {gameStart ? (
        <div>
          <div className="game__header">
            <h1 className="game__header__title">{game}</h1>
            <div className="game__header__characters">
              {characters.length > 0 && (
                <p>Find {characters.length > 1 ? 'us' : 'me'}:</p>
              )}
              <div>
                {characters.map((character) => (
                  <img
                    key={character.name}
                    src={character.image}
                    alt={character.name}
                  ></img>
                ))}
              </div>
            </div>
            <div className="character__header">
              {characters.map((character) => (
                <img
                  key={character.name}
                  src={character.image}
                  alt={character.name}
                ></img>
              ))}
            </div>
          </div>
            <div className="search">
              <img
                className="search__img"
                src={image}
                alt={altImage}
                onLoad={handleImageLoad}
                onClick={handleTargetBoxClick}
              />
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
            {gameOver && <AddScoreForm level={game} time={sec.toFixed(2)} />}
        </div>
      ) : (
        <div className='start'>
          <div className='start__box'>
            <p>Find these characters</p>
            <div>
              {characters.map((character) => (
                <img
                  key={character.name}
                  src={character.image}
                  alt={character.name}
                ></img>
              ))}
            </div>
            <button onClick={handleGameStart}>Let's go!</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Level;
