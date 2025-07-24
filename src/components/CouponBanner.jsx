// src/components/CouponBanner.jsx
import React from "react";

export default function CouponBanner() {
  const deadline = new Date("2025-08-01T23:59:00").getTime();
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = deadline - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div style={{
      background: "#ffeb3b",
      color: "#333",
      textAlign: "center",
      padding: "0.75rem",
      fontWeight: "bold"
    }}>
      Código <code>APOYO</code>: $20 de descuento 
      &nbsp;|&nbsp; Oferta termina en {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
}