import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Level from '../components/Level';
import Nintendo64 from '/nintendo64.png';
import Prehistoria from '/levels/prehistoria/prehistoria.png';
import Sheep from '/levels/prehistoria/sheep.png';
import Tails from '/levels/prehistoria/tails.png';
import Toucan from '/levels/prehistoria/toucan.png';
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
    let coordHeight = 0;

    if (e.view.outerWidth > 850) {
      coordHeight = clientY - rect.top + 20;
    } else {
      coordHeight = clientY - rect.top - 50;
    }

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

  const levelData = {
    nintendo: {
      image: Nintendo64,
      altImage: 'nintendo-game',
    },
    prehistoria: {
      image: Prehistoria,
      altImage: 'prehistoria-game',
      characters: [
        { name: 'Sheep', image: Sheep },
        { name: 'Tails', image: Tails },
        { name: 'Toucan', image: Toucan },
      ],
    },
    dragon: {
      image: DragonIsland,
      altImage: 'dragon-island',
    },
  };

  const selectedLevelData = levelData[name];
  const characters = selectedLevelData ? selectedLevelData.characters : [];

  return (
    <div className="game__page">
      {selectedLevelData ? (
        <Level
          game={name}
          timer={timer.toFixed()}
          image={selectedLevelData.image}
          altImage={selectedLevelData.altImage}
          handleImageLoad={handleImageLoad}
          handleTargetBoxClick={handleTargetBoxClick}
          dropdownVisible={dropdownVisible}
          dropdownPosition={dropdownPosition}
          characters={characters}
        />
      ) : (
        <h1>{name} is not a game.</h1>
      )}
    </div>
  );
};

export default Game;
