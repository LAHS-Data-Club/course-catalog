import { useState, useEffect } from "react";

function Timer() {
  const [eventDate, setEventDate] = useState("February 21, 2025 00:00:00");
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  useEffect(() => {
    if (countdownStarted && eventDate) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        let remainingTime = eventTime - currentTime;
        if (remainingTime <= 0) {
          remainingTime = 0;
          clearInterval(countdownInterval);
          alert('countdown complete');
        }
        setTimeRemaining(remainingTime);
      }, 1000);
      return () => clearInterval(countdownInterval)
    }

  }, [countdownStarted, eventDate, timeRemaining]);

  return(
    <div className="bg-blue-500">
      <div>{timeRemaining}</div>
      <button 
        onClick={() => setCountdownStarted(true)}
        className="bg-blue-300 rounded"
      >
          start countdown
      </button>
    </div>
  );
}

export default Timer;