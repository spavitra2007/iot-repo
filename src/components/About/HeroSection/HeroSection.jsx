/* ==========================================================================
   HeroSection.jsx
   IoT • Robotics • STEM Academy – landing hero
   Requires: npm i lucide-react
   ========================================================================== */

import { memo, useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plug,
  Radio,
  Brain,
  Zap,
  Sparkles,
} from "lucide-react";

/* CSS is imported here – no inline styles, no CSS modules */
import "./HeroSection.css";

/* Slideshow images – imported so the bundler always finds them.
   Folder: src/assets/hero/  (replace these files with your own photos) */
import iotHeroImgOne from "../../../assets/About/hero/hero-slide-1.png";
import iotHeroImgTwo from "../../../assets/About/hero/hero-slide-2.png";
import iotHeroImgThree from "../../../assets/About/hero/hero-slide-3.png";

/* ==========================================================================
   SECTION 1 – STATIC DATA (defined once, outside the component,
   so nothing is re-created on re-render)
   ========================================================================== */

/* Slider slides – images come from the imports above */
const IOT_HERO_SLIDES = [
  {
    id: "slide-hardware",
    src: iotHeroImgOne,
    alt: "Students assembling hardware and sensors in a workshop",
    tag: "Hardware & Sensors",
  },
  {
    id: "slide-robotics",
    src: iotHeroImgTwo,
    alt: "Students building and programming a robot",
    tag: "Robotics Lab",
  },
  {
    id: "slide-coding",
    src: iotHeroImgThree,
    alt: "Students writing code for microcontrollers",
    tag: "Coding & IoT",
  },
];

/* Feature cards shown below the hero */
const IOT_HERO_FEATURES = [
  {
    id: "feature-hands-on",
    Icon: Plug,
    title: "Hands-on Learning",
    text: "Learn by assembling microcontrollers, breadboards, and troubleshooting real sensor circuits.",
  },
  {
    id: "feature-projects",
    Icon: Radio,
    title: "Real Projects",
    text: "Transform ideas into functional smart home IoT prototypes and automated hardware systems.",
  },
  {
    id: "feature-guidance",
    Icon: Brain,
    title: "Expert Guidance",
    text: "Direct mentorship from experienced embedded systems engineers and STEM educators.",
  },
  {
    id: "feature-skills",
    Icon: Zap,
    title: "Future-Ready Skills",
    text: "Master robotics architecture, computational thinking, and industrial telemetry.",
  },
];

const IOT_HERO_AUTOPLAY_MS = 5000;

/* ==========================================================================
   SECTION 2 – SAFETY HELPERS
   Only allow internal paths, hash links, http(s) and mailto/tel links.
   Anything else (e.g. "javascript:") falls back to "#".
   ========================================================================== */
const iotHeroSafeHref = (url) => {
  if (typeof url !== "string") return "#";
  const value = url.trim();
  return /^(\/|#|https?:\/\/|mailto:|tel:)/i.test(value) ? value : "#";
};

/* ==========================================================================
   SECTION 3 – FEATURE CARD (memoized, one component reused 4 times)
   ========================================================================== */
const IotHeroFeatureCard = memo(function IotHeroFeatureCard({
  Icon,
  title,
  text,
  index,
}) {
  return (
    <li className="iot-hero__card">
      <div className="iot-hero__card-top">
        <span className="iot-hero__card-icon" aria-hidden="true">
          <Icon size={18} />
        </span>
        {/* Number badge (01, 02, 03, 04) */}
        <span className="iot-hero__card-badge" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="iot-hero__card-title">{title}</h3>
      <p className="iot-hero__card-text">{text}</p>
    </li>
  );
});

/* ==========================================================================
   SECTION 4 – IMAGE SLIDER (memoized, only re-renders when slide changes)
   ========================================================================== */
const IotHeroSlider = memo(function IotHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedIds, setFailedIds] = useState([]);

  const total = IOT_HERO_SLIDES.length;

  /* Navigation handlers (stable references) */
  const goPrev = useCallback(
    () => setActiveIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const goNext = useCallback(
    () => setActiveIndex((i) => (i + 1) % total),
    [total]
  );

  /* If an image fails to load, hide it instead of showing a broken icon */
  const handleImageError = useCallback((id) => {
    setFailedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  /* Autoplay – paused on hover/focus and when user prefers reduced motion */
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isPaused || reduceMotion || total < 2) return undefined;

    const timer = setInterval(goNext, IOT_HERO_AUTOPLAY_MS);
    return () => clearInterval(timer); /* cleanup – no memory leaks */
  }, [isPaused, goNext, total]);

  const activeSlide = IOT_HERO_SLIDES[activeIndex];

  return (
    <div
      className="iot-hero__slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Academy highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="iot-hero__slider-frame">
        {/* Slides – all stacked, only opacity changes (no layout shift) */}
        {IOT_HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          const isFailed = failedIds.includes(slide.id);
          return (
            <img
              key={slide.id}
              className={`iot-hero__slide${
                isActive ? " iot-hero__slide--active" : ""
              }${isFailed ? " iot-hero__slide--failed" : ""}`}
              src={slide.src}
              alt={slide.alt}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              aria-hidden={!isActive}
              onError={() => handleImageError(slide.id)}
            />
          );
        })}

        {/* Top-right tag */}
        <span className="iot-hero__slide-tag" aria-live="polite">
          {activeSlide.tag}
        </span>

        {/* Prev / Next arrows */}
        <button
          type="button"
          className="iot-hero__arrow iot-hero__arrow--prev"
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="iot-hero__arrow iot-hero__arrow--next"
          onClick={goNext}
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="iot-hero__dots" role="tablist" aria-label="Choose slide">
          {IOT_HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}`}
              className={`iot-hero__dot${
                index === activeIndex ? " iot-hero__dot--active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Bottom-right floating chip */}
        <span className="iot-hero__chip">
          <Sparkles size={14} aria-hidden="true" />
          Build a real project
        </span>
      </div>
    </div>
  );
});

/* ==========================================================================
   SECTION 5 – MAIN HERO COMPONENT
   Props:
     exploreHref – link for "Explore Programs" button
     demoHref    – link for "Book a Free Demo" button
   ========================================================================== */
function HeroSection({ exploreHref = "#programs", demoHref = "#book-demo" }) {
  return (
    <section className="iot-hero" aria-labelledby="iot-hero-heading">
      <div className="iot-hero__container">
        {/* ---------- 5.1 Top area: content + slider ---------- */}
        <div className="iot-hero__top">
          {/* Left content */}
          <div className="iot-hero__content">
            <span className="iot-hero__pill">
              <span className="iot-hero__pill-dot" aria-hidden="true" />
              IoT • Robotics • STEM Academy
            </span>

            <h1 id="iot-hero-heading" className="iot-hero__title">
              Where Kids Learn,
              <span className="iot-hero__title-accent"> Build &amp; Create </span>
              with Technology
            </h1>

            <p className="iot-hero__lead">
              Give your child hands-on experience with IoT, electronics,
              coding, robotics, and emerging technologies through fun,
              practical, and highly engaging projects.
            </p>

            {/* Call-to-action buttons */}
            <div className="iot-hero__actions">
              <a
                className="iot-hero__btn iot-hero__btn--primary"
                href={iotHeroSafeHref(exploreHref)}
              >
                Explore Programs
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                className="iot-hero__btn iot-hero__btn--secondary"
                href={iotHeroSafeHref(demoHref)}
              >
                Book a Free Demo
              </a>
            </div>
          </div>

          {/* Right slider */}
          <IotHeroSlider />
        </div>

        {/* ---------- 5.2 Bottom area: feature cards ---------- */}
        <ul className="iot-hero__cards">
          {IOT_HERO_FEATURES.map(({ id, Icon, title, text }, index) => (
            <IotHeroFeatureCard
              key={id}
              Icon={Icon}
              title={title}
              text={text}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default memo(HeroSection);
