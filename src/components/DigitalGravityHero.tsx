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
  /* ───── State ───── */
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showCountryCodes, setShowCountryCodes] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState({
    flag: "🇦🇪",
    name: "United Arab Emirates",
    code: "971",
    pattern: "xxx xxx xxxx",
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countrySearch, setCountrySearch] = useState<string>("");

  // Common countries for dropdown
  const countries = [
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

  // Filter countries based on search
  const filteredCountries = countrySearch
    ? countries.filter(
        (country) =>
          country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
          country.code.includes(countrySearch)
      )
    : countries;

  /* ───── Scroll Effect ───── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ───── Stars Effect ───── */
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

  /* ───── Handle Schedule Call ───── */
  const handleScheduleCall = () => {
    setShowScheduleModal(true);
  };

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
          <li onClick={() => setMenuOpen(false)}>Services</li>
          <li onClick={() => setMenuOpen(false)}>Industry</li>
          <li onClick={() => setMenuOpen(false)}>Our Work</li>
          <li onClick={() => setMenuOpen(false)}>About</li>
          <li onClick={() => setMenuOpen(false)}>Blog</li>
          <li onClick={() => setMenuOpen(false)}>Career</li>
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

            <form
              className="schedule-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted! We'll contact you soon.");
                setShowScheduleModal(false);
              }}
            >
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

              {/* Budget Range */}
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
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const displayValue =
                      value > 100000
                        ? "AED 100K+"
                        : `AED ${value.toLocaleString()}`;
                    document.getElementById(
                      "budgetValue"
                    )!.textContent = `Current: ${displayValue}`;
                  }}
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
