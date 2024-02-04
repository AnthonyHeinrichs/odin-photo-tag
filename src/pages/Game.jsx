import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularCursor from "../components/CircularCursor";
import GameHeader from "../components/GameHeader"
import Nintendo64 from "/nintendo64.png";
import Prehistoria from "/levels/prehistoria/prehistoria.png";
import DragonIsland from "/dragon-island.png";
import "../styles/Game.scss";

const Game = () => {
  const [timer, setTimer] = useState(0);
  const [naturalDimension, setNaturalDimension] = useState({
    naturalWidth: 0,
    naturalHeight: 0,
  });
  const [imgDimension, setImgDimension] = useState({
    width: 0,
    height: 0,
  });
  const [coords, setCoords] = useState({ width: 0, height: 0 });
  const [xScale, setXScale] = useState(0);
  const [yScale, setYScale] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const { name } = useParams();

  // Handling our interval for game timer

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (e) => {
    setNaturalDimension({
      naturalWidth: e.currentTarget.naturalWidth,
      naturalHeight: e.currentTarget.naturalHeight,
    });

    setImgDimension({
      width: e.currentTarget.clientWidth,
      height: e.currentTarget.clientHeight,
    });
  };

  const selectCharacter = () => {

  }

  const handleTargetBoxClick = (e) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const imgWidth = e.currentTarget.clientWidth;
    const imgHeight = e.currentTarget.clientHeight;
    const coordWidth = clientX - rect.left;
    const coordHeight = clientY - rect.top;

    setImgDimension({
      width: imgWidth,
      height: imgHeight,
    });

    setCoords({
      width: coordWidth,
      height: coordHeight,
    });

    setDropdownPosition({
      x: coordWidth,
      y: coordHeight,
    });

    setDropdownVisible(prevVisibility => !prevVisibility);
    selectCharacter();
  };

  useEffect(() => {
    setXScale(imgDimension.width / naturalDimension.naturalWidth);
    setYScale(imgDimension.height / naturalDimension.naturalHeight);
  }, [imgDimension]);

  useEffect(() => {
    console.log(coords.width / xScale, coords.height / yScale);
  }, [xScale, yScale, coords]);

  return (
    <div className="game__page">
      <CircularCursor />
      {name === "nintendo" ? (
        <>
          <GameHeader game={name} timer={timer.toFixed()} />
          <div className="search">
            <img
              className="search__img"
              src={Nintendo64}
              alt="nintendo-game"
              onLoad={handleImageLoad}
              onClick={handleTargetBoxClick}
            />
          </div>
          {dropdownVisible && (
            <div
              className="dropdown"
              style={{left: dropdownPosition.x + 10, top: dropdownPosition.y + 55 }}
            >
              <div>
                <p>Character 1</p>
                <p>Character 2</p>
                <p>Character 3</p>
                <p>Character 4</p>
              </div>
            </div>
          )}  
        </>
      ) : name === "prehistoria" ? (
        <>
          <GameHeader game={name} timer={timer.toFixed()} />
          <div className="search">
            <img
              className="search__img"
              src={Prehistoria}
              alt="prehistoria-game"
              onLoad={handleImageLoad}
              onClick={handleTargetBoxClick}
            />
          </div>
          {dropdownVisible && (
            <div
              className="dropdown"
              style={{left: dropdownPosition.x + 10, top: dropdownPosition.y + 55 }}
            >
              <div>
                <p>Character 1</p>
                <p>Character 2</p>
                <p>Character 3</p>
                <p>Character 4</p>
              </div>
            </div>
          )}    
        </>
      ) : name === "dragon" ? (
        <>
          <GameHeader game={name} timer={timer.toFixed()} />
          <div className="search">
            <img
              className="search__img"
              src={DragonIsland}
              alt="dragon-island-game"
              onLoad={handleImageLoad}
              onClick={handleTargetBoxClick}
            />
          </div>
          {dropdownVisible && (
            <div
              className="dropdown"
              style={{left: dropdownPosition.x + 10, top: dropdownPosition.y + 55 }}
            >
              <div>
                <p>Character 1</p>
                <p>Character 2</p>
                <p>Character 3</p>
                <p>Character 4</p>
              </div>
            </div>
          )}  
        </>
      ) : (
        <h1>{name} is not a game.</h1>
      )}
    </div>
  );
};

export default Game;