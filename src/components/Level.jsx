import { useState, useEffect } from 'react';

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
  const [showSec, setShowSec] = useState(0);

  // Initializing a timer
  useEffect(() => {
    const timer = setInterval(() => {
      setShowSec((prevShowSec) => prevShowSec + 0.1);
    }, 100);

    if (characters.length === 0) {
      clearInterval(timer);
      handleWin((showSec).toFixed(1));
    }

    return () => clearInterval(timer);
  }, [showSec]);

  return (
    <>
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
    </>
  );
};

export default Level;
