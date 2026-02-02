import { useEffect, useState } from "react";
import "./DigitalGravity.css";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
};

type Country = {
  flag: string;
  name: string;
  code: string;
  pattern: string;
};

type ChatMessage = {
  type: "user" | "agent";
  text: string;
  time: string;
};

const DigitalGravityHero = (): JSX.Element => {
  /* ───── State ───── */
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showCountryCodes, setShowCountryCodes] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    flag: "🇦🇪",
    name: "United Arab Emirates",
    code: "971",
    pattern: "xxx xxx xxxx",
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countrySearch, setCountrySearch] = useState<string>("");

  /* ───── Countries Data ───── */
  const countries: Country[] = [
    {
      flag: "🇦🇪",
      name: "United Arab Emirates",
      code: "971",
      pattern: "xxx xxx xxxx",
    },
    { flag: "🇸🇦", name: "Saudi Arabia", code: "966", pattern: "xx xxx xxxx" },
    { flag: "🇶🇦", name: "Qatar", code: "974", pattern: "xxx xxxxx" },
    { flag: "🇴🇲", name: "Oman", code: "968", pattern: "xx xxx xxx" },
    { flag: "🇰🇼", name: "Kuwait", code: "965", pattern: "xxx xxxxx" },
    { flag: "🇧🇭", name: "Bahrain", code: "973", pattern: "xxxx xxxx" },
    { flag: "🇮🇳", name: "India", code: "91", pattern: "xxxxx xxxxx" },
    { flag: "🇵🇰", name: "Pakistan", code: "92", pattern: "xxx xxxxxxx" },
    { flag: "🇺🇸", name: "United States", code: "1", pattern: "(xxx) xxx-xxxx" },
    { flag: "🇬🇧", name: "United Kingdom", code: "44", pattern: "xxxx xxxxxx" },
    { flag: "🇨🇦", name: "Canada", code: "1", pattern: "(xxx) xxx-xxxx" },
    { flag: "🇦🇺", name: "Australia", code: "61", pattern: "x xxx xxx xxx" },
    { flag: "🇸🇬", name: "Singapore", code: "65", pattern: "xxxx xxxx" },
    { flag: "🇲🇾", name: "Malaysia", code: "60", pattern: "xx-xxxx xxxx" },
  ];

  /* ───── Effects ───── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatWidget = document.querySelector(".chat-widget");
      if (
        chatOpen &&
        chatWidget &&
        !chatWidget.contains(event.target as Node)
      ) {
        setChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [chatOpen]);

  /* ───── Filter Countries ───── */
  const filteredCountries = countrySearch
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
          country.code.includes(countrySearch)
      )
    : countries;

  /* ───── Chat Functions ───── */
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      type: "user",
      text: chatInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "Thanks for your message! How can I help you further?",
        "I understand. Our team will get back to you shortly.",
        "Great question! Let me connect you with an expert.",
        "I've noted your requirement. Would you like to schedule a call?",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const agentMessage: ChatMessage = {
        type: "agent",
        text: randomResponse,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChatMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);

      if (!chatOpen) {
        setUnreadMessages((prev) => prev + 1);
      }
    }, 1500);
  };

  const handleQuickAction = (action: "question" | "quote" | "schedule") => {
    const messages = {
      question: "I have a question about your services",
      quote: "I'd like to get a quote for my project",
      schedule: "I want to schedule a consultation call",
    };

    setChatInput(messages[action]);
    setTimeout(() => handleSendMessage(), 500);
  };

  /* ───── Event Handlers ───── */
  const handleScheduleCall = () => {
    setShowScheduleModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! We'll contact you soon.");
    setShowScheduleModal(false);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const displayValue =
      value > 100000 ? "AED 100K+" : `AED ${value.toLocaleString()}`;
    const budgetValueElement = document.getElementById("budgetValue");
    if (budgetValueElement) {
      budgetValueElement.textContent = `Current: ${displayValue}`;
    }
  };

  /* ───── Render ───── */
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

        <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          <li onClick={() => setMenuOpen(false)} className="nav-items">
            Services
          </li>
          <li onClick={() => setMenuOpen(false)} className="nav-items">
            Industry
          </li>
          <li onClick={() => setMenuOpen(false)} className="nav-items">
            Our Work
          </li>
          <li onClick={() => setMenuOpen(false)} className="nav-items">
            About
          </li>
          <li onClick={() => setMenuOpen(false)} className="nav-items">
            Blog
          </li>
          <li onClick={() => setMenuOpen(false)} className="nav-items">
            Career
          </li>
        </ul>

        <button className="cta-btn">Speak to an expert ✉ 📞</button>

        <button
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="planet-wrapper">
          <div className="planet-glow" />
          <div className="planet" />
          <div className="planet-ring" />
        </div>

        <h1>Connecting Brands Globally</h1>
        <p>
          Have a project in mind? Schedule a Short Intro Call with an expert.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={handleScheduleCall}>
            Schedule a call
          </button>
          <button className="secondary-btn">See our work</button>
        </div>
      </div>

      {/* What We Do Section */}
      <section className="what-we-do-section">
        <div className="section-badge">
          <span className="badge-dot"></span>
          What We Do
        </div>

        <h2 className="section-title">
          Fueled Up 500+ Brands to
          <br />
          Roar with Next-GenTech
        </h2>

        <div className="planet-scene">
          <div className="planet-earth-wrapper">
            <div className="planet-earth">
              {/* Update this path based on your project structure */}
              <img src="src\assets\earth-bg.png" alt="Earth" className="earth-image" />
            </div>
          </div>

          {/* Brand logos overlaying through planet */}
          <div className="brand-logos-overlay">
            <div className="brand-logos-track">
              <div className="logo-item">arabianpost</div>
              <div className="logo-item">ALJAZEERA</div>
              <div className="logo-item">ZAWYA</div>
              <div className="logo-item">GULF NEWS</div>
              <div className="logo-item">Khaleej Times</div>
              {/* Duplicate for seamless loop */}
              <div className="logo-item">arabianpost</div>
              <div className="logo-item">ALJAZEERA</div>
              <div className="logo-item">ZAWYA</div>
              <div className="logo-item">GULF NEWS</div>
              <div className="logo-item">Khaleej Times</div>
            </div>
          </div>
        </div>

        <div className="global-presence">
          <span className="presence-label">Our Global Presence</span>
          <div className="presence-locations">
            <span className="location-dot"></span>
            <span className="location-text">USA</span>
            <span className="location-dot"></span>
            <span className="location-text">UAE</span>
            <span className="location-dot"></span>
            <span className="location-text">Saudi Arabia</span>
            <span className="location-dot"></span>
            <span className="location-text">Pakistan</span>
          </div>
        </div>
      </section>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div
          className="schedule-modal-overlay"
          onClick={() => setShowScheduleModal(false)}
        >
          <div className="schedule-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Let's Get Started</h3>
              <button
                className="modal-close"
                onClick={() => setShowScheduleModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-subtitle">
              This Could Be the Start of Something Incredible!
            </div>

            <form className="schedule-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Name*</label>
                <input type="text" placeholder="Your full name" required />
              </div>

              <div className="form-group">
                <label>Name of your company / organisation*</label>
                <input type="text" placeholder="Company name" required />
              </div>

              <div className="form-group">
                <label>Phone No*</label>
                <div className="phone-input-group">
                  <div className="country-code-selector">
                    <button
                      type="button"
                      className="country-code-toggle"
                      onClick={() => setShowCountryCodes(!showCountryCodes)}
                    >
                      <span className="selected-country">
                        <span className="country-flag-display">
                          {selectedCountry.flag}
                        </span>
                        <span className="country-code-display">
                          +{selectedCountry.code}
                        </span>
                      </span>
                      <span className="dropdown-arrow">▼</span>
                    </button>

                    {showCountryCodes && (
                      <div className="country-code-dropdown">
                        <div className="dropdown-header">
                          <h4>Select Country</h4>
                          <button
                            className="close-dropdown"
                            onClick={() => setShowCountryCodes(false)}
                          >
                            ✕
                          </button>
                        </div>
                        <div className="dropdown-search">
                          <input
                            type="text"
                            placeholder="Search country or code..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="country-list">
                          {filteredCountries.map((country) => (
                            <button
                              type="button"
                              key={country.code}
                              className={`country-option ${
                                selectedCountry.code === country.code
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => {
                                setSelectedCountry(country);
                                setShowCountryCodes(false);
                                setCountrySearch("");
                              }}
                            >
                              <span className="country-flag">
                                {country.flag}
                              </span>
                              <div className="country-info">
                                <span className="country-name">
                                  {country.name}
                                </span>
                                <span className="country-details">
                                  +{country.code} • {country.pattern}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                        {filteredCountries.length === 0 && (
                          <div className="no-results">
                            No countries found for "{countrySearch}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <span className="phone-format-hint">
                  Format: {selectedCountry.pattern}
                </span>
              </div>

              <div className="form-group">
                <label>Email*</label>
                <input type="email" placeholder="Email address" required />
              </div>

              <div className="form-group">
                <label>Service you are interested in*</label>
                <select required>
                  <option value="">Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="branding">Branding</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Timeline*</label>
                <select required>
                  <option value="">Select timeline</option>
                  <option value="urgent">Urgent (1-2 weeks)</option>
                  <option value="short">Short (1 month)</option>
                  <option value="medium">Medium (1-3 months)</option>
                  <option value="long">Long (3-6 months)</option>
                </select>
              </div>

              <div className="budget-range">
                <label>Budget Range*</label>
                <div className="range-labels">
                  <span>AED 5K</span>
                  <span>AED 100K+</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="105000"
                  step="5000"
                  defaultValue="50000"
                  className="budget-slider"
                  id="budgetSlider"
                  onChange={handleBudgetChange}
                />
                <div className="budget-value" id="budgetValue">
                  Current: AED 50,000
                </div>
              </div>

              <div className="form-group">
                <label>Tell us about your project</label>
                <textarea
                  placeholder="Describe your project in detail..."
                  rows={4}
                />
              </div>

              <div className="budget-note">
                A transparent budget will help us ensure expectations are met.
                Not sure? Ballparks are fine.
              </div>

              <button type="submit" className="modal-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <div className="chat-widget">
        {chatOpen && (
          <div className="chat-box">
            <div className="chat-header">
              <div className="chat-avatar">
                <div className="avatar-icon">💬</div>
                <div className="chat-agent-info">
                  <h4>Digital Gravity Assistant</h4>
                  <span className="chat-status">Online</span>
                </div>
              </div>
              <button className="chat-close" onClick={() => setChatOpen(false)}>
                ✕
              </button>
            </div>

            <div className="chat-messages">
              <div className="message agent">
                <div className="message-content">
                  Welcome to Digital Gravity! We're here to help. How can I
                  assist you today?
                </div>
                <div className="message-time">Just now</div>
              </div>

              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-content">{msg.text}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
              ))}

              {isTyping && (
                <div className="message agent typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>

            <div className="chat-actions">
              <button
                className="chat-action-btn"
                onClick={() => handleQuickAction("question")}
              >
                💭 I have a question
              </button>
              <button
                className="chat-action-btn"
                onClick={() => handleQuickAction("quote")}
              >
                💰 Get a quote
              </button>
              <button
                className="chat-action-btn"
                onClick={() => handleQuickAction("schedule")}
              >
                📅 Schedule consultation
              </button>
            </div>

            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="chat-send-btn"
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        )}

        <button
          className="chat-btn"
          onClick={() => setChatOpen((prev) => !prev)}
          aria-label="Open chat"
        >
          {chatOpen ? "✕" : "💬"}
          {unreadMessages > 0 && (
            <span className="chat-badge">{unreadMessages}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default DigitalGravityHero;