const Level = ({
  game,
  timer,
  image,
  altImage,
  handleImageLoad,
  handleTargetBoxClick,
  dropdownVisible,
  dropdownPosition,
}) => {
  if (game === 'prehistoria') {
    // characters
  }

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
            <p>Character 1</p>
            <p>Character 2</p>
            <p>Character 3</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Level;
