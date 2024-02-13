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

  useEffect(() => {
    let timer;
  
    if (gameStart) {
      timer = setInterval(() => { 
        setSec((prevsec) => prevsec + 0.1);
      }, 100);
  
      if (characters.length === 0) {
        clearInterval(timer);
        setGameOver(true);
        handleWin((sec).toFixed(2));
      }
    }
  
    return () => clearInterval(timer); 
  }, [sec, gameStart]);

  const handleGameStart = () => {
    setGameStart(true);
  };

  return  (
    <>
      {!gameOver && (
        <div className='game__page' style={{ display: gameStart ? 'block' : 'none' }}>
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
                    className='character'
                    src={character.image}
                    alt={character.name}
                  ></img>
                ))}
              </div>
            </div>
          </div>
          <div className="character__header">
            {characters.map((character) => (
              <img
                key={character.name}
                className='character'
                src={character.image}
                alt={character.name}
              ></img>
            ))}
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
                    className='character'
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
      {!gameStart && !gameOver && (
        <div className='start'>
          <div className='start__box'>
            <p>Find these characters</p>
            <div>
              {characters.map((character) => (
                <img
                  key={character.name}
                  className='character'
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
