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
        <h1>{game}</h1>
        <p>{timer} seconds</p>
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
          <div>
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
