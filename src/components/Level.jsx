const Level = ({
  game,
  timer,
  image,
  altImage,
  handleImageLoad,
  handleTargetBoxClick,
  dropdownVisible,
  dropdownPosition,
  characters
}) => {
  return (
    <>
      <div className="game__header">
        <p className="game__header__timer">{timer} seconds</p>
        <h1 className="game__header__title">{game}</h1>
        <div className="game__header__characters">
          <p>Find us:</p>
          <div>
            {characters.map((character) => (
              <img key={character.name} src={character.image} alt={character.name}></img>
            ))}
          </div>
        </div>
      </div>
      <div className="character__header">
        {characters.map((character) => (
          <img key={character.name} src={character.image} alt={character.name}></img>
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
              <img key={index} src={character.image} alt={character.name}></img>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Level;
