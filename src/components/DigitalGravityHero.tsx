// import { useEffect, useState } from "react";
// import "./DigitalGravity.css";
// const [scrolled, setScrolled] = useState<boolean>(false);

// useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

// type Star = {
//   x: number;
//   y: number;
//   size: number;
//   opacity: number;
//   animationDuration: number;
// };

// const DigitalGravityHero = (): JSX.Element => {
//   const [stars, setStars] = useState<Star[]>([]);
//   const [chatOpen, setChatOpen] = useState<boolean>(false);

//   useEffect(() => {
//     const newStars: Star[] = Array.from({ length: 150 }, () => ({
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 2.5 + 0.5,
//       opacity: Math.random() * 0.7 + 0.3,
//       animationDuration: Math.random() * 3 + 2,
//     }));
//     setStars(newStars);
//   }, []);

//   return (
//     <div className="hero">
//       {/* Stars */}
//       <div className="stars">
//         {stars.map((star, i) => (
//           <div
//             key={i}
//             className="star"
//             style={{
//               left: `${star.x}%`,
//               top: `${star.y}%`,
//               width: `${star.size}px`,
//               height: `${star.size}px`,
//               opacity: star.opacity,
//               animation: `twinkle ${star.animationDuration}s ease-in-out infinite`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Navbar */}
//       <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
//         <div className="logo">
//           <div className="logo-small">digital</div>
//           <div className="logo-big">gravity</div>
//         </div>

//         <ul className="nav-links">
//           <li>Services</li>
//           <li>Industry</li>
//           <li>Our Work</li>
//           <li>About</li>
//           <li>Blog</li>
//           <li>Career</li>
//         </ul>

//         <button className="cta-btn">Speak to an expert ✉ 📞</button>
//       </nav>

//       {/* Hero Content */}
//       <div className="hero-content">
//         <div className="planet-wrapper">
//           <div className="planet-glow" />
//           <div className="planet" />
//           <div className="planet-highlight" />
//           <div className="planet-ring" />
//         </div>

//         <h1>Connecting Brands Globally</h1>
//         <p>
//           Have a project in mind? Schedule a Short Intro Call with an expert.
//         </p>

//         <div className="hero-buttons">
//           <button className="primary-btn">Schedule a call</button>
//           <button className="secondary-btn">See our work</button>
//         </div>
//       </div>

//       {/* Chat */}
//       <div className="chat-widget">
//         {chatOpen && (
//           <div className="chat-box">
//             <p>Welcome to Digital Gravity. We're here to help!</p>
//             <button>I have a question</button>
//             <button>Get a quote</button>
//             <button>Schedule consultation</button>
//           </div>
//         )}

//         <button
//           className="chat-btn"
//           onClick={() => setChatOpen((prev) => !prev)}
//         >
//           {chatOpen ? "✕" : "💬"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DigitalGravityHero;

import { useEffect, useState } from "react";
import "./DigitalGravity.css";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
};

const DigitalGravityHero = (): JSX.Element => {
  // ✅ Hooks must be inside the component
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stars effect
  useEffect(() => {
    const newStars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      animationDuration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="hero">
      {/* Stars */}
      <div className="stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.animationDuration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="logo">
          <div className="logo-small">digital</div>
          <div className="logo-big">gravity</div>
        </div>

        <ul className="nav-links">
          <li>Services</li>
          <li>Industry</li>
          <li>Our Work</li>
          <li>About</li>
          <li>Blog</li>
          <li>Career</li>
        </ul>

        <button className="cta-btn">Speak to an expert ✉ 📞</button>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="planet-wrapper">
          <div className="planet-glow" />
          <div className="planet" />
          <div className="planet-highlight" />
          <div className="planet-ring" />
        </div>

        <h1>Connecting Brands Globally</h1>
        <p>
          Have a project in mind? Schedule a Short Intro Call with an expert.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Schedule a call</button>
          <button className="secondary-btn">See our work</button>
        </div>
      </div>

      {/* Chat */}
      <div className="chat-widget">
        {chatOpen && (
          <div className="chat-box">
            <p>Welcome to Digital Gravity. We're here to help!</p>
            <button>I have a question</button>
            <button>Get a quote</button>
            <button>Schedule consultation</button>
          </div>
        )}

        <button
          className="chat-btn"
          onClick={() => setChatOpen((prev) => !prev)}
        >
          {chatOpen ? "✕" : "💬"}
        </button>
      </div>
    </div>
  );
};

export default DigitalGravityHero;
