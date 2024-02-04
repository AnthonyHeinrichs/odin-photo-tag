import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularCursor from '../components/CircularCursor';
import Level from '../components/Level';
import Nintendo64 from '/nintendo64.png';
import Prehistoria from '/prehistoria.png';
import DragonIsland from '/dragon-island.png';
import '../styles/Game.scss';

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

  const selectCharacter = () => {};

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

    setDropdownVisible((prevVisibility) => !prevVisibility);
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
      {name === 'nintendo' ? (
        <Level
          game={name}
          timer={timer.toFixed()}
          image={Nintendo64}
          altImage="nintendo-game"
          handleImageLoad={handleImageLoad}
          handleTargetBoxClick={handleTargetBoxClick}
          dropdownVisible={dropdownVisible}
          dropdownPosition={dropdownPosition}
        />
      ) : name === 'prehistoria' ? (
        <Level
          game={name}
          timer={timer.toFixed()}
          image={Prehistoria}
          altImage="prehistoria-game"
          handleImageLoad={handleImageLoad}
          handleTargetBoxClick={handleTargetBoxClick}
          dropdownVisible={dropdownVisible}
          dropdownPosition={dropdownPosition}
        />
      ) : name === 'dragon' ? (
        <Level
          game={name}
          timer={timer.toFixed()}
          image={DragonIsland}
          altImage="dragon-island"
          handleImageLoad={handleImageLoad}
          handleTargetBoxClick={handleTargetBoxClick}
          dropdownVisible={dropdownVisible}
          dropdownPosition={dropdownPosition}
        />
      ) : (
        <h1>{name} is not a game.</h1>
      )}
    </div>
  );
};

export default Game;
