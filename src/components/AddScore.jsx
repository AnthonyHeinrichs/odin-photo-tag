import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddScoreForm = ({ level, time }) => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [updatedLevel, setUpdatedLevel] = useState('');
  const [convertedTime, setConvertedTime] = useState(0);

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
        break;
      case 'dragon':
        setUpdatedLevel(`Dragon Charmer's Island`);
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
    <div className="score_form">
      <div className="score_form__content">
        <h2>{updatedLevel}</h2>
        <h3 className="score_form__content__text">
          Time: {convertedTime} {convertedTime > 1 ? 'minutes' : 'seconds'}
        </h3>
        <p>Add your score to the leaderboard</p>
        <form className="score_form__content__inputs" onSubmit={handleSubmit}>
          <input
            className="form_name_input"
            type="text"
            id="name"
            name="name"
            placeholder="Your nickname..."
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
  );
};

export default AddScoreForm;
