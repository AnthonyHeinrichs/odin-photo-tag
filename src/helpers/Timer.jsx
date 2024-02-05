import { useState, useEffect } from 'react';

const Timer = function Timer({ setshowentercode }) {
  const [showsec, setshowsec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setshowsec(showsec + 1), 1000);

    return () => clearInterval(timer);
  }, [setshowentercode, showsec]);

  return <span>{showsec}</span>;
};

export default Timer;
