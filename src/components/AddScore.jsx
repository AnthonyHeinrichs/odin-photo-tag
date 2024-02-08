import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddScoreForm = ({ level, time }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const navigateTo = useNavigate();

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
          time: time,
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
    <form onSubmit={handleSubmit}>
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
  );
};

export default AddScoreForm;
