import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Level from '../components/Level';
import Prehistoria from '/levels/prehistoria/prehistoria.png';
import Sheep from '/levels/prehistoria/sheep.png';
import Tails from '/levels/prehistoria/tails.png';
import Toucan from '/levels/prehistoria/toucan.png';
import oliverCity from '/levels/oliver-city/oliver-city.png';
import Oliver from '/levels/oliver-city/oliver.png';
import Car from '/levels/oliver-city/car.png';
import Frog from '/levels/oliver-city/frog.png';
import DragonIsland from '/levels/dragon-island/dragon-island.png';
import Cat from '/levels/dragon-island/cat.png';
import Heart from '/levels/dragon-island/heart.png';
import Robot from '/levels/dragon-island/robot.png';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Game.scss';

const Game = () => {
  const [characterLocations, setCharacterLocations] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
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
  const apiKey = import.meta.env.VITE_API_KEY;

  // Setting some basic data for each of our levels
  const levelData = {
    oliver: {
      image: oliverCity,
      altImage: 'oliver-city',
      characters: [
        { name: 'Oliver', image: Oliver },
        { name: 'Car', image: Car },
        { name: 'Frog', image: Frog },
      ],
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
      characters: [
        { name: 'Cat', image: Cat },
        { name: 'Heart', image: Heart },
        { name: 'Robot', image: Robot },
      ],
    },
  };

  // Setting that data in variables to pass to the Level component
  const selectedLevelData = levelData[name];
  const characters = selectedLevelData ? selectedLevelData.characters : [];
  const filteredCharacters = characters.filter(
    (character) => !foundCharacters.includes(character.name)
  );

  // Handling level completion (win)
  const handleWin = (time) => {
    console.log(`You won in ${time} seconds`);
  };

  // Fetch for location data as locations are hidden in DB
  const fetchCharacterLocations = async () => {
    try {
      const resp = await fetch('http://localhost:5000/games', {
        headers: {
          'X-API-Key': apiKey,
        },
      });
      const json = await resp.json();

      const gameLocationData = json.games.find((level) => level.name === name);

      setCharacterLocations(gameLocationData);
    } catch (error) {
      console.error('Error fetching character locations', error);
    }
  };

  // Fetching the data once
  useEffect(() => {
    fetchCharacterLocations();
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

  // Checking if user character selection is in correct location
  const handleCharacterSelection = (character) => {
    const actualX = characterLocations[character].locationX;
    const actualY = characterLocations[character].locationY;
    const guessX = coords.width / xScale;
    const guessY = coords.height / yScale;
    const tolerance = 75;
    const isWithinToleranceX = Math.abs(actualX - guessX) <= tolerance;
    const isWithinToleranceY = Math.abs(actualY - guessY) <= tolerance;

    console.log(guessX, guessY);

    if (isWithinToleranceX && isWithinToleranceY) {
      setFoundCharacters((prevFoundCharacters) => [
        ...prevFoundCharacters,
        character,
      ]);
      toast(`You found ${character}`, {
        position: 'bottom-center',
        hideProgressBar: true,
        autoClose: 2000,
        progress: 0,
        theme: 'dark',
      });
    } else {
      toast.error(`Try again!`, {
        position: 'bottom-center',
        hideProgressBar: true,
        autoClose: 2000,
        progress: 0,
        theme: 'dark',
      });
    }

    setDropdownVisible(false);
    return;
  };

  // Handling user clicks, dropdown location, screen resizing etc.
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
      y: coordHeight - 50,
    });

    setDropdownVisible((prevVisibility) => !prevVisibility);
  };

  // If the wimmelbilder image is resized, update the X and Y scale
  useEffect(() => {
    setXScale(imgDimension.width / naturalDimension.naturalWidth);
    setYScale(imgDimension.height / naturalDimension.naturalHeight);
  }, [imgDimension]);

  return (
    <div>
      <AnimatePresence>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
          {selectedLevelData ? (
            <Level
              game={name}
              image={selectedLevelData.image}
              altImage={selectedLevelData.altImage}
              handleImageLoad={handleImageLoad}
              handleTargetBoxClick={handleTargetBoxClick}
              handleCharacterSelection={handleCharacterSelection}
              handleWin={handleWin}
              dropdownVisible={dropdownVisible}
              dropdownPosition={dropdownPosition}
              characters={filteredCharacters}
            />
          ) : (
            <h1>{name} is not currently available.</h1>
          )}
          <ToastContainer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Game;
