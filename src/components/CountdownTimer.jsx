import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const targetDate = new Date("2025-08-01T23:59:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "1rem", background: "#fff3cd", border: "1px solid #ffeeba", margin: "1rem", borderRadius: "8px" }}>
      <strong>🎉 ¡Promoción activa!</strong><br />
      Finaliza en: <br />
      <span style={{ fontSize: "1.5rem" }}>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );
};

export default CountdownTimer;