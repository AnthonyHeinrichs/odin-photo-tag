import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import oliverCityCard from '/levels/oliver-city/oliver-city-card.png';
import prehistoriaCard from '/levels/prehistoria/prehistoria-card.png';
import dragonIslandCard from '/levels/dragon-island/dragon-island-card.png';

const AddScoreForm = ({ level, time }) => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [updatedLevel, setUpdatedLevel] = useState('');
  const [convertedTime, setConvertedTime] = useState(0);
  const [cardImg, setCardImg] = useState(oliverCityCard);

  const navigateTo = useNavigate();

  useEffect(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    setConvertedTime((minutes + seconds / 100).toFixed(2));

    switch (level) {
      case 'oliver':
        setUpdatedLevel('Oliver Town');
        break;
      case 'prehistoria':
        setUpdatedLevel('Prehistoria');
        setCardImg(prehistoriaCard);
        break;
      case 'dragon':
        setUpdatedLevel(`Dragon Island`);
        setCardImg(dragonIslandCard);
        break;
      default:
        setUpdatedLevel('');
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch('http://localhost:5000/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          level: level,
          name: formData.name,
          time: convertedTime,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      navigateTo('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence> 
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
           <div className="score_form">
            <div className="score_form__content">
              <img className="score_form__img" src={cardImg} alt="level-picture" />
              <div className="score_form__content__text">
                <h2 className="score_form__content__text_title">{updatedLevel}</h2>
                <h3 className="score_form__content__text_time">{convertedTime} minutes</h3>
              </div>
              <p>Add your score to the leaderboard</p>
              <form className="score_form__content__inputs" onSubmit={handleSubmit}>
                <input
                  className="form_name_input"
                  type="text"
                  id="name"
                  name="name"
                  minlength="2"
                  maxlength="12"
                  placeholder="Your nickname..."
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <button className="form_submit_btn" type="submit">
                  Submit
                </button>
              </form>
              <Link className="score_form__content__return" to="/">
                <button className="score_form__content__return_btn">
                  Back to Main Menu
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
};

export default AddScoreForm;
