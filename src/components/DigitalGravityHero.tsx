import { useEffect, useState, useRef } from "react";
import earthImg from "../assets/earth-bg.png";
import astronoutImg from "../assets/bg-astrounout.png";
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

type SectionRefs = {
  [key: string]: HTMLElement | null;
};

type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
  services: string[];
};

type Testimonial = {
  id: number;
  brand: string;
  brandSubtext?: string;
  brandColor: string;
  clientName: string;
  role: string;
  quote: string;
  rating: number;
  bg: string;
  accent: string;
  initials: string;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const DigitalGravityHero = (): JSX.Element => {
  /* ───── State ───── */
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
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
  const [activeFilter, setActiveFilter] = useState<string>("Website");
  const [showSideButtons, setShowSideButtons] = useState<boolean>(false);
  const [partnersVisible, setPartnersVisible] = useState<boolean>(false);
  
  // Services Section State
  const [activeServiceCategory, setActiveServiceCategory] = useState<string>("development");

  // Testimonials State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollStart, setScrollStart] = useState<number>(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState<number>(0);
  const [testimonialsVisible, setTestimonialsVisible] = useState<boolean>(false);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [faqVisible, setFaqVisible] = useState<boolean>(false);

  /* ───── Refs ───── */
  const sectionRefs = useRef<SectionRefs>({});
  const innovationsSectionRef = useRef<HTMLElement | null>(null);
  const partnersSectionRef = useRef<HTMLElement | null>(null);
  const testimonialTrackRef = useRef<HTMLDivElement | null>(null);
  const testimonialsSectionRef = useRef<HTMLElement | null>(null);
  const faqSectionRef = useRef<HTMLElement | null>(null);

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

  /* ───── Services Data ───── */
  const serviceCategories: ServiceCategory[] = [
    {
      id: "development",
      name: "Development",
      icon: "🚀",
      services: [
        "Web Development",
        "Mobile App Development",
        "E-commerce Websites",
        "UI/UX Design",
        "ERP Software",
        "IT Resource Outsourcing",
      ],
    },
    {
      id: "digital-marketing",
      name: "Digital Marketing",
      icon: "📈",
      services: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) Advertising",
        "Social Media Marketing",
        "Content Marketing",
        "Email Marketing",
        "Marketing Analytics",
      ],
    },
    {
      id: "emerging-tech",
      name: "Emerging Tech",
      icon: "🤖",
      services: [
        "Artificial Intelligence",
        "Machine Learning Solutions",
        "Blockchain Development",
        "Internet of Things (IoT)",
        "Augmented Reality (AR)",
        "Virtual Reality (VR)",
      ],
    },
    {
      id: "advertising-creative",
      name: "Advertising & Creative",
      icon: "🎨",
      services: [
        "Brand Identity Design",
        "Creative Campaign Development",
        "Video Production",
        "Graphic Design",
        "Copywriting",
        "Print & Digital Advertising",
      ],
    },
  ];

  const activeServices =
    serviceCategories.find((cat) => cat.id === activeServiceCategory)?.services || [];

  /* ───── Testimonials Data ───── */
  const testimonials: Testimonial[] = [
    {
      id: 1,
      brand: "Faqra Hills",
      brandColor: "#1a472a",
      clientName: "Sarah Al-Mansouri",
      role: "Marketing Director",
      quote:
        "Digital Gravity transformed our online presence completely. Our bookings increased by 340% within the first quarter. The team's attention to detail and strategic approach was unlike anything we had experienced before.",
      rating: 5,
      bg: "linear-gradient(160deg, #1a472a 0%, #2d6a4f 40%, #52b788 100%)",
      accent: "#52b788",
      initials: "SM",
    },
    {
      id: 2,
      brand: "ADMAF",
      brandSubtext: "أبوظبي للموسيقى والفنون",
      brandColor: "#8B0000",
      clientName: "Ahmad Al-Rashidi",
      role: "Chief Executive Officer",
      quote:
        "The digital campaigns created for ADMAF's festival season were extraordinary. We saw engagement levels we had never achieved before, with a reach that spanned across 40+ countries globally.",
      rating: 5,
      bg: "linear-gradient(160deg, #1a0a0a 0%, #4a0e0e 40%, #8B0000 100%)",
      accent: "#c0392b",
      initials: "AR",
    },
    {
      id: 3,
      brand: "HAKA Group",
      brandColor: "#0a1628",
      clientName: "James Whitmore",
      role: "VP of Digital Strategy",
      quote:
        "Working with Digital Gravity on our regional expansion was a game-changer. Their tech-forward approach to branding and their understanding of the MENA market gave us a true competitive edge.",
      rating: 5,
      bg: "linear-gradient(160deg, #0a1628 0%, #1a2a4a 40%, #2563eb 100%)",
      accent: "#3b82f6",
      initials: "JW",
    },
    {
      id: 4,
      brand: "scout kidz",
      brandColor: "#f97316",
      clientName: "Priya Nambiar",
      role: "Founder & Creative Director",
      quote:
        "The brand identity Digital Gravity developed for Scout Kidz perfectly captured the spirit of adventure and learning we stand for. Parents and children alike love the new look. Truly magical work.",
      rating: 5,
      bg: "linear-gradient(160deg, #431407 0%, #9a3412 40%, #f97316 100%)",
      accent: "#fb923c",
      initials: "PN",
    },
    {
      id: 5,
      brand: "Elixir Wellness",
      brandColor: "#5b21b6",
      clientName: "Dr. Leila Hassan",
      role: "Brand Manager",
      quote:
        "From SEO to social media strategy, Digital Gravity handled every touchpoint of our digital presence. The results speak for themselves — a 5x increase in organic traffic within six months.",
      rating: 5,
      bg: "linear-gradient(160deg, #1e0a3c 0%, #3b0764 40%, #7c3aed 100%)",
      accent: "#a855f7",
      initials: "LH",
    },
  ];

  /* ───── FAQ Data ───── */
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "I need web design services for my enterprise website. Can you help?",
      answer: "Absolutely! At Digital Gravity, we specialize in enterprise-level web design solutions. Our team of 200+ experts can build scalable, secure, and user-friendly websites tailored to your business needs. We leverage the latest technologies and AI-powered tools to create websites that not only look stunning but also drive conversions and growth."
    },
    {
      id: 2,
      question: "What will be the turnaround time for my project?",
      answer: "Project timelines vary based on scope and complexity. Typically, a standard website takes 4-8 weeks, while enterprise solutions may take 12-16 weeks. We'll provide you with a detailed timeline during our initial consultation, breaking down each phase including design, development, testing, and deployment."
    },
    {
      id: 3,
      question: "How much will a web design agency in Dubai charge me?",
      answer: "Our pricing is customized based on your specific requirements. Projects typically range from AED 15,000 for basic websites to AED 150,000+ for complex enterprise solutions. We offer flexible payment plans and transparent pricing with no hidden costs. Schedule a consultation for a detailed quote."
    },
    {
      id: 4,
      question: "Is responsive web design important?",
      answer: "Absolutely critical! With over 60% of web traffic coming from mobile devices, responsive design is essential. Our websites are built mobile-first, ensuring seamless experiences across all devices - smartphones, tablets, and desktops. This improves user engagement, SEO rankings, and conversion rates."
    },
    {
      id: 5,
      question: "How many years have you served in the UAE market?",
      answer: "Digital Gravity has been serving the UAE and broader MENA region for over 10 years. We've successfully delivered 500+ projects for clients ranging from startups to Fortune 500 companies. Our deep understanding of the local market, combined with global best practices, makes us the ideal partner for your digital transformation journey."
    },
    {
      id: 6,
      question: "How can I compare different web design services?",
      answer: "When comparing agencies, consider: portfolio quality, industry experience, technology expertise, post-launch support, pricing transparency, and client testimonials. At Digital Gravity, we stand out with our AI-powered solutions, multilingual support, comprehensive service offering, and proven track record with award-winning projects."
    },
    {
      id: 7,
      question: "What skills should a web designer in Dubai have?",
      answer: "Top web designers should possess: UI/UX expertise, proficiency in modern frameworks (React, Vue, Angular), responsive design skills, SEO knowledge, accessibility standards compliance, and strong creative abilities. Our team combines technical excellence with creative innovation, staying updated with the latest design trends and technologies."
    },
    {
      id: 8,
      question: "What are the elements of web design in UAE?",
      answer: "Effective web design in the UAE market requires: bilingual support (Arabic/English), cultural sensitivity, RTL (right-to-left) design capabilities, compliance with local regulations, mobile-first approach, fast loading speeds, and integration with popular regional payment gateways and platforms."
    }
  ];

  /* ───── Effects ───── */
  useEffect(() => {
    // Set up section refs
    sectionRefs.current = {
      hero: document.querySelector('.hero'),
      whatWeDo: document.querySelector('.what-we-do-section'),
    };

    // Scroll event for navbar transition and side buttons visibility
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      setScrolled(scrollY > 20);
      
      // Check if innovations section is in view
      if (innovationsSectionRef.current) {
        const rect = innovationsSectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
        setShowSideButtons(isInView);
      }

      // Check if partners section is in view
      if (partnersSectionRef.current) {
        const rect = partnersSectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0;
        setPartnersVisible(isInView);
      }

      // Check if testimonials section is in view
      if (testimonialsSectionRef.current) {
        const rect = testimonialsSectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0;
        setTestimonialsVisible(isInView);
      }

      // Check if FAQ section is in view
      if (faqSectionRef.current) {
        const rect = faqSectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0;
        setFaqVisible(isInView);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
  
    const handleScroll = () => {
      lastScrollY = window.scrollY;
  
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(lastScrollY > 50); // Increase threshold for better UX
          
          // Your other scroll logic here...
          if (innovationsSectionRef.current) {
            const rect = innovationsSectionRef.current.getBoundingClientRect();
            const isInView = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
            setShowSideButtons(isInView);
          }
  
          ticking = false;
        });
  
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
  
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

  // Testimonials scroll tracking
  useEffect(() => {
    const track = testimonialTrackRef.current;
    if (!track) return;
    
    const handleScroll = () => {
      const cardWidth = track.scrollWidth / testimonials.length;
      setActiveTestimonialIndex(Math.round(track.scrollLeft / cardWidth));
    };
    
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [testimonials.length]);

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

  /* ───── Navbar Click Handlers ───── */
  const handleNavClick = (section: string) => {
    setMenuOpen(false);
  };

  /* ───── Testimonial Drag Functions ───── */
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!testimonialTrackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - testimonialTrackRef.current.offsetLeft);
    setScrollStart(testimonialTrackRef.current.scrollLeft);
    testimonialTrackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !testimonialTrackRef.current) return;
    e.preventDefault();
    const x = e.pageX - testimonialTrackRef.current.offsetLeft;
    testimonialTrackRef.current.scrollLeft = scrollStart - (x - startX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (testimonialTrackRef.current) {
      testimonialTrackRef.current.style.cursor = "grab";
    }
  };

  const scrollToTestimonial = (index: number) => {
    const track = testimonialTrackRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / testimonials.length;
    track.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  /* ───── FAQ Toggle Function ───── */
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  /* ───── Render ───── */
  return (
    <>
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
      <nav 
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        data-scrolled={scrolled}
        data-section={activeSection}
      >
        <div className="logo">
          <div className="logo-small">digital</div>
          <div className="logo-big">gravity</div>
        </div>

        <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          <li onClick={() => handleNavClick("Services")} className="nav-items">
            Services
          </li>
          <li onClick={() => handleNavClick("Industry")} className="nav-items">
            Industry
          </li>
          <li onClick={() => handleNavClick("OurWork")} className="nav-items">
            Our Work
          </li>
          <li onClick={() => handleNavClick("About")} className="nav-items">
            About
          </li>
          <li onClick={() => handleNavClick("Blog")} className="nav-items">
            Blog
          </li>
          <li onClick={() => handleNavClick("Career")} className="nav-items">
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
      <section className="what-we-do-section" ref={el => sectionRefs.current.whatWeDo = el}>
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
              <img src={earthImg} className="earth-image"/>
            </div>
          </div>

          <div className="brand-logos-overlay">
            <div className="brand-logos-track">
              <div className="logo-item">arabianpost</div>
              <div className="logo-item">ALJAZEERA</div>
              <div className="logo-item">ZAWYA</div>
              <div className="logo-item">GULF NEWS</div>
              <div className="logo-item">Khaleej Times</div>
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

      {/* Innovations Section - Premium Portfolio */}
      <section className="innovations-section" ref={innovationsSectionRef}>
        {/* Vertical "Get A Quote" Button */}
        <button className={`vertical-quote-btn ${showSideButtons ? 'visible' : ''}`}>
          <span>Get A Quote</span>
        </button>

        {/* Social Media Icons */}
        <div className={`social-icons-stack ${showSideButtons ? 'visible' : ''}`}>
          <a href="#" className="social-icon" aria-label="Behance">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11.987h3.813c2.171 0 2.171-3.389 0-3.389H3v3.389zm0 5.014h4.937c2.509 0 2.509-3.895 0-3.895H3v3.895z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>
        </div>

        {/* Section Content */}
        <div className="innovations-container">
          {/* Header */}
          <div className="innovations-header">
            <div className="section-badge-premium">
              <span className="badge-dot"></span>
              <span>Our Work</span>
            </div>

            <h2 className="innovations-title-premium">
              10+ Years Exp but
              <br />
              Countless Innovations
            </h2>

            {/* Category Filter */}
            <div className="category-filter">
              <button 
                className={`filter-item ${activeFilter === "Website" ? "active" : ""}`}
                onClick={() => setActiveFilter("Website")}
              >
                {activeFilter === "Website" && <span className="filter-arrow">→</span>}
                Website
              </button>
              <button 
                className={`filter-item ${activeFilter === "Mobile App" ? "active" : ""}`}
                onClick={() => setActiveFilter("Mobile App")}
              >
                {activeFilter === "Mobile App" && <span className="filter-arrow">→</span>}
                Mobile App
              </button>
              <button 
                className={`filter-item ${activeFilter === "SMM" ? "active" : ""}`}
                onClick={() => setActiveFilter("SMM")}
              >
                {activeFilter === "SMM" && <span className="filter-arrow">→</span>}
                SMM
              </button>
              <button 
                className={`filter-item ${activeFilter === "PPC" ? "active" : ""}`}
                onClick={() => setActiveFilter("PPC")}
              >
                {activeFilter === "PPC" && <span className="filter-arrow">→</span>}
                PPC
              </button>
              <button 
                className={`filter-item ${activeFilter === "Print" ? "active" : ""}`}
                onClick={() => setActiveFilter("Print")}
              >
                {activeFilter === "Print" && <span className="filter-arrow">→</span>}
                Print
              </button>
              <button 
                className={`filter-item ${activeFilter === "SEO" ? "active" : ""}`}
                onClick={() => setActiveFilter("SEO")}
              >
                {activeFilter === "SEO" && <span className="filter-arrow">→</span>}
                SEO
              </button>
              <button 
                className={`filter-item ${activeFilter === "Branding" ? "active" : ""}`}
                onClick={() => setActiveFilter("Branding")}
              >
                {activeFilter === "Branding" && <span className="filter-arrow">→</span>}
                Branding
              </button>
              <button 
                className={`filter-item ${activeFilter === "View All" ? "active" : ""}`}
                onClick={() => setActiveFilter("View All")}
              >
                {activeFilter === "View All" && <span className="filter-arrow">→</span>}
                View All
              </button>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="portfolio-grid">
            {/* Card 1 - Tablet UI */}
            <div className="portfolio-card">
              <div className="card-media">
                <div className="card-thumbnail tablet-preview">
                  <div className="device-mockup tablet">
                    <div className="device-screen">
                      <div className="preview-content">
                        <div className="preview-header"></div>
                        <div className="preview-text"></div>
                        <div className="preview-text short"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-overlay"></div>
              </div>
              <div className="card-info">
                <h3 className="card-title">Digital Uplift for DIFC</h3>
              </div>
            </div>

            {/* Card 2 - Laptop Industrial */}
            <div className="portfolio-card">
              <div className="card-media">
                <div className="card-thumbnail laptop-preview">
                  <div className="device-mockup laptop">
                    <div className="laptop-screen">
                      <div className="preview-content industrial">
                        <div className="industrial-overlay">
                          <span className="company-name">DP WORLD</span>
                        </div>
                      </div>
                    </div>
                    <div className="laptop-base"></div>
                  </div>
                </div>
                <div className="card-overlay"></div>
              </div>
              <div className="card-info">
                <h3 className="card-title">Engineered DP World for Global Reach</h3>
              </div>
            </div>

            {/* Card 3 - Sephora Brand */}
            <div className="portfolio-card sephora-card">
              <div className="card-media">
                <div className="card-thumbnail sephora-preview">
                  <div className="sephora-brand-overlay">
                    <div className="brand-name">SEPHORA</div>
                    <div className="campaign-name">SQUAD</div>
                  </div>
                </div>
                <div className="card-overlay"></div>
              </div>
              <div className="card-info">
                <h3 className="card-title">Sephora – Beauty brand, Powered by Tech</h3>
              </div>
            </div>

            {/* Duplicate cards */}
            <div className="portfolio-card sephora-card">
              <div className="card-media">
                <div className="card-thumbnail sephora-preview">
                  <div className="sephora-brand-overlay">
                    <div className="brand-name">SEPHORA</div>
                    <div className="campaign-name">SQUAD</div>
                  </div>
                </div>
                <div className="card-overlay"></div>
              </div>
              <div className="card-info">
                <h3 className="card-title">Sephora – Beauty brand, Powered by Tech</h3>
              </div>
            </div>

            <div className="portfolio-card sephora-card">
              <div className="card-media">
                <div className="card-thumbnail sephora-preview">
                  <div className="sephora-brand-overlay">
                    <div className="brand-name">SEPHORA</div>
                    <div className="campaign-name">SQUAD</div>
                  </div>
                </div>
                <div className="card-overlay"></div>
              </div>
              <div className="card-info">
                <h3 className="card-title">Sephora – Beauty brand, Powered by Tech</h3>
              </div>
            </div>

            <div className="portfolio-card sephora-card">
              <div className="card-media">
                <div className="card-thumbnail sephora-preview">
                  <div className="sephora-brand-overlay">
                    <div className="brand-name">SEPHORA</div>
                    <div className="campaign-name">SQUAD</div>
                  </div>
                </div>
                <div className="card-overlay"></div>
              </div>
              <div className="card-info">
                <h3 className="card-title">Sephora – Beauty brand, Powered by Tech</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Recognition Section */}
      <section className="partners-section" ref={partnersSectionRef}>
        <div className="partners-container">
          <div className="section-badge-partners">
            <span className="badge-dot"></span>
            <span>Partners & Recognition</span>
          </div>

          {/* Partners Grid - Row 1 */}
          <div className={`partners-grid ${partnersVisible ? 'visible' : ''}`}>
            <div className="partner-card" style={{ animationDelay: '0.1s, 0s' }}>
              <div className="partner-logo">
                <div className="cnbc-logo">
                  <span style={{ fontSize: '40px' }}>📺</span>
                  <span style={{ fontWeight: 'bold', fontSize: '24px' }}>CNBC</span>
                </div>
              </div>
            </div>

            <div className="partner-card" style={{ animationDelay: '0.2s, 0.5s' }}>
              <div className="partner-logo">
                <span style={{ fontSize: '28px', fontWeight: '600' }}>Clutch</span>
                <span style={{ fontSize: '11px', opacity: '0.7' }}>FIRMS THAT DELIVER</span>
              </div>
            </div>

            <div className="partner-card" style={{ animationDelay: '0.3s, 1s' }}>
              <div className="partner-logo facebook-partner">
                <span style={{ fontSize: '24px' }}>f</span>
                <div style={{ fontSize: '11px', textAlign: 'left' }}>
                  <div style={{ fontWeight: '600' }}>Marketing</div>
                  <div style={{ fontWeight: '600' }}>Partners</div>
                </div>
              </div>
            </div>

            <div className="partner-card" style={{ animationDelay: '0.4s, 1.5s' }}>
              <div className="partner-logo">
                <span style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'serif' }}>Forbes</span>
              </div>
            </div>

            <div className="partner-card" style={{ animationDelay: '0.5s, 2s' }}>
              <div className="partner-logo">
                <span style={{ fontSize: '24px', fontWeight: '600' }}>Entrepreneur</span>
              </div>
            </div>

            <div className="partner-card" style={{ animationDelay: '0.6s, 2.5s' }}>
              <div className="partner-logo">
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e74c3c' }}>BusinessWeek</span>
              </div>
            </div>

            <div className="partner-card" style={{ animationDelay: '0.7s, 0.3s' }}>
              <div className="partner-logo">
                <span style={{ fontSize: '36px', fontWeight: 'bold' }}>Inc.</span>
              </div>
            </div>

            <div className="partner-card" style={{ animationDelay: '0.8s, 0.8s' }}>
              <div className="partner-logo">
                <span style={{ fontSize: '28px', fontWeight: '600' }}>Bloomberg</span>
              </div>
            </div>
          </div>

          {/* Awards Grid - Row 2 */}
          <div className={`partners-grid awards-grid ${partnersVisible ? 'visible' : ''}`}>
            <div className="partner-card award-card" style={{ animationDelay: '0.9s, 1.2s' }}>
              <div className="award-badge">
                <div style={{ fontSize: '10px', color: '#FFD700' }}>⭐⭐⭐</div>
                <div style={{ fontSize: '9px', marginTop: '4px' }}>AWARD WINNER</div>
              </div>
            </div>

            <div className="partner-card award-card" style={{ animationDelay: '1s, 1.7s' }}>
              <div className="award-badge mena-award">
                <span style={{ fontSize: '20px', color: '#FFD700' }}>🏆</span>
                <div style={{ fontSize: '10px', marginTop: '4px' }}>
                  <div style={{ fontWeight: 'bold', color: '#FFD700' }}>MENA SEARCH</div>
                  <div style={{ fontSize: '9px', color: '#32CD32' }}>AWARDS 2024</div>
                  <div style={{ fontSize: '9px', marginTop: '2px' }}>WINNER</div>
                </div>
              </div>
            </div>

            <div className="partner-card award-card" style={{ animationDelay: '1.1s, 0.2s' }}>
              <div className="award-badge mena-award">
                <span style={{ fontSize: '20px', color: '#FFD700' }}>🏆</span>
                <div style={{ fontSize: '10px', marginTop: '4px' }}>
                  <div style={{ fontWeight: 'bold', color: '#FF1493' }}>MENA SEARCH</div>
                  <div style={{ fontSize: '9px', color: '#FF1493' }}>AWARDS 2023</div>
                  <div style={{ fontSize: '9px', marginTop: '2px' }}>WINNER</div>
                </div>
              </div>
            </div>

            <div className="partner-card award-card" style={{ animationDelay: '1.2s, 0.7s' }}>
              <div className="award-badge">
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#32CD32' }}>MENA SEARCH</div>
                <div style={{ fontSize: '10px', color: '#32CD32' }}>AWARDS 2019</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '4px' }}>WINNER</div>
              </div>
            </div>

            <div className="partner-card award-card" style={{ animationDelay: '1.3s, 2.2s' }}>
              <div className="award-badge">
                <div style={{ fontSize: '10px', color: '#FF1493', fontWeight: 'bold' }}>MENA 2018</div>
                <div style={{ fontSize: '9px', color: '#FF1493' }}>SEARCH AWARDS</div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>WINNER</div>
              </div>
            </div>

            <div className="partner-card award-card" style={{ animationDelay: '1.4s, 2.7s' }}>
              <div className="award-badge">
                <div style={{ fontSize: '10px', color: '#9B59B6', fontWeight: 'bold' }}>MENA 2017</div>
                <div style={{ fontSize: '9px', color: '#9B59B6' }}>SEARCH AWARDS</div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>WINNER</div>
              </div>
            </div>

            <div className="partner-card award-card" style={{ animationDelay: '1.5s, 0.4s' }}>
              <div className="award-badge hubspot-badge">
                <span style={{ fontSize: '20px' }}>🎯</span>
                <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '4px' }}>HubSpot</div>
                <div style={{ fontSize: '9px', opacity: '0.8' }}>Certified Partner</div>
              </div>
            </div>

            <div className="partner-card award-card" style={{ animationDelay: '1.6s, 0.9s' }}>
              <div className="award-badge">
                <span style={{ fontSize: '24px' }}>🌟</span>
                <div style={{ fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>Excellence</div>
                <div style={{ fontSize: '9px', opacity: '0.8' }}>Award 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section-container">
        {/* Background Grid & Glow */}
        <div className="services-bg-grid"></div>
        <div className="services-bg-glow"></div>

        {/* Main Content */}
        <div className="services-content">
          {/* Left Column - Service Categories */}
          <div className="services-left-column">
            <div className="services-label">
              <span className="services-dot"></span>
              <span className="services-label-text">Our Services</span>
            </div>

            <div className="services-category-list">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-item ${
                    activeServiceCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveServiceCategory(category.id)}
                >
                  {activeServiceCategory === category.id && category.icon && (
                    <span className="category-icon">{category.icon}</span>
                  )}
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Service Details */}
          <div className="services-right-column">
            <div className="services-detail-panel">
              <div className="services-detail-content">
                {activeServices.map((service, index) => (
                  <div
                    key={index}
                    className="service-item"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          TESTIMONIALS SECTION
      ======================================== */}
      <section className="testi-section" ref={testimonialsSectionRef}>
        <div className="testi-inner">
          {/* Decorative count */}
          <div className="testi-count">
            {String(activeTestimonialIndex + 1).padStart(2, "0")}
          </div>

          {/* Header */}
          <div className={`testi-header ${testimonialsVisible ? "visible" : ""}`}>
            <div className="testi-label">
              <span className="testi-label-dot" />
              Client Testimonials
            </div>
            <h2 className="testi-heading">
              What Our <em>Happy Clients</em>
              <br />
              Say About Us
            </h2>
          </div>

          {/* Track */}
          <div className="testi-track-wrapper">
            <div className="testi-fade-left" />
            <div className="testi-fade-right" />

            <div
              className="testi-track"
              ref={testimonialTrackRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className={`testi-card ${testimonialsVisible ? "visible" : ""}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {/* Portrait Media */}
                  <div className="card-media">
                    <div
                      className="card-bg"
                      style={{ background: t.bg }}
                    >
                      <div className="card-avatar-ring">
                        <span className="card-initials">{t.initials}</span>
                      </div>

                      <div className="card-quote-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.12 }}>
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      <p className="card-quote-text">"{t.quote}"</p>

                      <div className="card-stars">
                        {Array.from({ length: t.rating }).map((_, si) => (
                          <svg key={si} width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Lightning CTA */}
                    <button className="card-lightning-btn" aria-label="Interact">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M13 2L4.09 12.97H11L10 22l8.91-10.97H13L13 2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="card-footer">
                    <span className="card-brand-name">{t.brand}</span>
                    {t.brandSubtext && (
                      <span className="card-brand-sub">{t.brandSubtext}</span>
                    )}
                    <span className="card-client-role">
                      {t.clientName} · {t.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Nav */}
          <div className={`testi-nav ${testimonialsVisible ? "visible" : ""}`}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`nav-dot ${i === activeTestimonialIndex ? "active" : ""}`}
                onClick={() => scrollToTestimonial(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          NEW: FAQ SECTION
      ======================================== */}
      <section className="faq-section" ref={faqSectionRef}>
        <div className="faq-container">
          {/* Left Column - Header */}
          <div className="faq-left-column">
            <div className="faq-badge">
              <span className="faq-badge-dot"></span>
              <span>FAQs</span>
            </div>
            <h2 className={`faq-title ${faqVisible ? "visible" : ""}`}>
              Transformation with<br />
              Smart UX &<br />
              Scalable Tech
            </h2>
            <p className={`faq-description ${faqVisible ? "visible" : ""}`}>
              You have the vision—we engineer for the future. At Digital Gravity, we embrace the modern technology with creativity to provide AI-powered multilingual support, no-code AI website construction solutions, predictive UX and intelligent UI/UX design. No, Matter is you are looking for AI-powered hosting to autonomous maintenance bots and AI-driven A/B testing, our team of 200+ team have expertise to build scalable digital products that think, adapt, and grow with your audience.
            </p>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="faq-right-column">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`faq-item ${openFaqIndex === index ? "active" : ""} ${faqVisible ? "visible" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaqIndex === index}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">+</span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* "Get A Quote" Fixed Button */}
        {/* <div className="faq-fixed-button">
          <button className="get-a-quote-btn">
            Get A Quote
          </button>
        </div> */} 

         {/* =====================================================
          ASTRONAUT SECTION
      ===================================================== */}
      <section className="astronout-section">

{/* Purple grid lines */}
<div className="astronout-grid" />

{/* Ambient fog blobs */}
<div className="astronout-fog-left" />
<div className="astronout-fog-right" />

{/* ── Full-bleed astronaut image — absolute center ── */}
<div className="astronout-img-wrap">
  <div className="astronout-planet-glow" />
  <div className="astronout-planet-ring" />
  <img
    src={astronoutImg}
    alt="Astronaut on glowing planet"
    className="astronout-img"
  />
</div>

{/* ── LEFT overlay: Large heading ── */}
<div className="astronout-left">
  <h2 className="astronout-heading">
    <span className="astronout-line1">Digital Gravity's</span>
    <span className="astronout-line2">Tech Nerds</span>
    <span className="astronout-line3">are here</span>
  </h2>
</div>

{/* ── RIGHT overlay: Copy + CTA ── */}
<div className="astronout-right">
  <p className="astronout-body">
    Client satisfaction is one of our top priorities. At Digital
    Gravity, our consistency, dedication towards work, and continuous
    drive for innovation have won us several accolades.
  </p>
  <p className="astronout-body">
    Hire web designers and web developers at Digital Gravity to build
    highly responsive, scalable, and feature-rich websites and
    applications with a touch of finesse.
  </p>
  <button className="astronout-cta" onClick={handleScheduleCall}>
    Start A Project
  </button>
</div>

</section>

        {/* Social Icons - Right Side */}
        {/* <div className="faq-social-icons">
          <a href="#" className="faq-social-icon" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
            </svg>
          </a>
          <a href="#" className="faq-social-icon" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="faq-social-icon" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="#" className="faq-social-icon" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>
          <a href="#" className="faq-social-icon" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
          <a href="#" className="faq-social-icon" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
            </svg>
          </a>
          <a href="#" className="faq-social-icon" aria-label="Phone">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
            </svg>
          </a>
        </div> */}
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
    
        {/* =====================================================
          FOOTER SECTION (OUTSIDE THE HERO DIV)
      ===================================================== */}
      <footer className="dg-footer">
        <div className="footer-container">

          {/* ── Brand Area: Logo + Social Icons ── */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-small">digital</span>
              <span className="footer-logo-big">gravity</span>
            </div>

            <div className="footer-social-icons">
              <a href="#" aria-label="Facebook" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a href="#" aria-label="Behance" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11.987h3.813c2.171 0 2.171-3.389 0-3.389H3v3.389zm0 5.014h4.937c2.509 0 2.509-3.895 0-3.895H3v3.895z"/>
                </svg>
              </a>
            </div>

            <div className="footer-divider" />
          </div>

          {/* ── 5-Column Footer Layout ── */}
          <div className="footer-columns">

            {/* Column 1: Contact Us */}
            <div className="footer-column">
              <h3 className="footer-column-title">Contact Us</h3>
              <div className="footer-column-content">
                <p>Office M-13, The Curve Building, Sheikh Zayed Road, Dubai, UAE</p>
                <p>discover@digitalgravity.ae</p>
                <p>+971 4 242 1375</p>
                <p>+971 4 834 6571</p>
              </div>
            </div>

            {/* Column 2: Overview */}
            <div className="footer-column">
              <h3 className="footer-column-title">Overview</h3>
              <ul className="footer-column-list">
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#work">Our Work</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact us</a></li>
                <li><a href="#career">Career</a></li>
              </ul>
            </div>

            {/* Column 3: Smart Technology Solutions */}
            <div className="footer-column">
              <h3 className="footer-column-title">Smart Technology Solutions</h3>
              <ul className="footer-column-list">
                <li><a href="#web-dev">Web Development</a></li>
                <li><a href="#uiux">UI/UX Design</a></li>
                <li><a href="#ecommerce">Ecommerce Web Development</a></li>
                <li><a href="#mobile">Mobile App Development</a></li>
                <li><a href="#ai">Artificial Intelligence</a></li>
                <li><a href="#chatbot">Chatbot Development</a></li>
                <li><a href="#vr">Virtual Reality Development</a></li>
                <li><a href="#ar">Augmented Reality Development</a></li>
              </ul>
            </div>

            {/* Column 4: Digital Growth & Marketing */}
            <div className="footer-column">
              <h3 className="footer-column-title">Digital Growth & Marketing</h3>
              <ul className="footer-column-list">
                <li><a href="#digital-marketing">Digital Marketing</a></li>
                <li><a href="#seo">Search Engine Optimization (SEO)</a></li>
                <li><a href="#geo">Generative Engine Optimization (GEO)</a></li>
                <li><a href="#ppc">Pay-Per-Click Advertising (PPC)</a></li>
                <li><a href="#smm">Social Media Marketing</a></li>
                <li><a href="#influencer">Influencer Marketing</a></li>
                <li><a href="#branding">Branding & Creative Design</a></li>
              </ul>
            </div>

            {/* Column 5: Industry */}
            <div className="footer-column">
              <h3 className="footer-column-title">Industry</h3>
              <ul className="footer-column-list">
                <li><a href="#real-estate">Real Estate</a></li>
                <li><a href="#government">Government</a></li>
                <li><a href="#healthcare">Healthcare</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#hospitality">Hospitality</a></li>
              </ul>
            </div>

          </div>

          {/* Large "gravity" watermark text at bottom */}
          <div className="footer-watermark" aria-hidden="true">
            @DIGITALGRAVITY
          </div>

        </div>
      </footer>
    </>
  );
};

export default DigitalGravityHero;