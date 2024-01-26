// CircularCursor.js
import React, { useState, useEffect } from 'react';

const CircularCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({
        x: e.clientX + window.pageXOffset,
        y: e.clientY + window.pageYOffset,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div
      className="circular_cursor"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default CircularCursor;