import React, { memo } from "react";
import "./LearningApproach.css";

/* ==========================================================
   IMAGE IMPORTS
   Images live in: src/assets/About/LearningApproach/
   NOTE: the "../../assets" path assumes this file sits two
   folders inside src (e.g. src/components/About/). If your
   file is somewhere else, only change these 4 lines.
   ========================================================== */
import lAprLearnImg from "../../../assets/About/LearningApproach/learn.png";
import lAprExploreImg from "../../../assets/About/LearningApproach/explore.png";
import lAprBuildImg from "../../../assets/About/LearningApproach/build.png";
import lAprCreateImg from "../../../assets/About/LearningApproach/create.png";

/* ==========================================================
   DATA SECTION
   Static data lives outside the component so it is created
   only once (no re-creation on re-render = no lag).
   ========================================================== */
const LAPR_HEADING_WORDS = [
  { id: "learn", text: "Learn." },
  { id: "explore", text: "Explore." },
  { id: "build", text: "Build." },
  { id: "create", text: "Create." },
];

const LAPR_STEPS = [
  {
    id: "learn",
    number: "01",
    title: "Learn",
    description: "Understand the core idea and the technology behind it.",
    image: lAprLearnImg,
    imageAlt: "Student learning on a laptop in a library",
  },
  {
    id: "explore",
    number: "02",
    title: "Explore",
    description: "Experiment with tools, components and different ideas.",
    image: lAprExploreImg,
    imageAlt: "Student experimenting with a circuit on a breadboard",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description: "Turn your idea into a working project.",
    image: lAprBuildImg,
    imageAlt: "A robot car project built on a desk",
  },
  {
    id: "create",
    number: "04",
    title: "Create",
    description: "Improve, customise and make it your own.",
    image: lAprCreateImg,
    imageAlt: "Student customising a project on a laptop dashboard",
  },
];

const LAPR_STATS = [
  {
    id: "hands-on",
    tag: "Practical Projects",
    value: "92%",
    label: "Hands-On",
    note: "",
  },
  {
    id: "disciplines",
    tag: "",
    value: "10+",
    label: "Tech Disciplines",
    note: "IoT, Robotics, Coding, and AI",
  },
  {
    id: "solutions",
    tag: "",
    value: "100+",
    label: "Real-world Solutions",
    note: "created by students",
  },
];

/* ==========================================================
   HELPER SECTION
   Hides a broken image instead of showing a broken-image icon
   (safety measure for missing or failed image paths)
   ========================================================== */
const lAprHideBrokenImage = (event) => {
  event.currentTarget.classList.add("lapr-card__img--hidden");
};

/* ==========================================================
   CARD SECTION
   One reusable step card. memo() stops re-rendering because
   the props never change.
   ========================================================== */
const LearningApproachCard = memo(function LearningApproachCard({
  step,
  isLast,
}) {
  return (
    <li className={`lapr-card lapr-tone--${step.id}`}>
      {/* Card header: number badge + title + description */}
      <div className="lapr-card__body">
        <span className="lapr-card__badge" aria-hidden="true">
          {step.number}
        </span>
        <div className="lapr-card__text">
          <h3 className="lapr-card__title">{step.title}</h3>
          <p className="lapr-card__desc">{step.description}</p>
        </div>
      </div>

      {/* Card image */}
      <div className="lapr-card__media">
        <img
          className="lapr-card__img"
          src={step.image}
          alt={step.imageAlt}
          width="400"
          height="260"
          loading="lazy"
          decoding="async"
          onError={lAprHideBrokenImage}
        />
      </div>

      {/* Arrow connector between cards (hidden on last card) */}
      {!isLast && (
        <span className="lapr-card__arrow" aria-hidden="true">
          &rarr;
        </span>
      )}
    </li>
  );
});

/* ==========================================================
   STAT SECTION
   One reusable outcome number (92%, 10+, 100+).
   ========================================================== */
const LearningApproachStat = memo(function LearningApproachStat({ stat }) {
  return (
    <li className="lapr-stat">
      {stat.tag && <span className="lapr-stat__tag">{stat.tag}</span>}
      <span className="lapr-stat__value">{stat.value}</span>
      <span className="lapr-stat__label">{stat.label}</span>
      {stat.note && <span className="lapr-stat__note">{stat.note}</span>}
    </li>
  );
});

/* ==========================================================
   MAIN COMPONENT
   Usage: <LearningApproach ctaHref="/contact" videoHref="/tour" />
   ========================================================== */
function LearningApproach({
  ctaHref = "#",
  ctaLabel = "Explore Our Approach",
  videoHref = "#",
  videoLabel = "Watch video tour",
}) {
  const lastIndex = LAPR_STEPS.length - 1;

  return (
    <section className="lapr-section" aria-labelledby="lapr-heading">
      <div className="lapr-container">
        {/* Eyebrow: small title with side lines */}
        <p className="lapr-eyebrow">
          <span className="lapr-eyebrow__text">Our Learning Approach</span>
        </p>

        {/* Main heading: each word has its own colour tone */}
        <h2 className="lapr-heading" id="lapr-heading">
          {LAPR_HEADING_WORDS.map((word) => (
            <span
              key={word.id}
              className={`lapr-heading__word lapr-tone--${word.id}`}
            >
              {word.text}
            </span>
          ))}
        </h2>

        {/* Sub heading */}
        <p className="lapr-subheading">
          A practical, project-based approach that takes you from ideas to
          real-world solutions.
        </p>

        {/* Steps list */}
        <ol className="lapr-steps">
          {LAPR_STEPS.map((step, index) => (
            <LearningApproachCard
              key={step.id}
              step={step}
              isLast={index === lastIndex}
            />
          ))}
        </ol>

        {/* Outcomes + call to action */}
        <div className="lapr-outcomes">
          {/* Key outcomes: title + numbers */}
          <div className="lapr-outcomes__stats">
            <h3 className="lapr-outcomes__title">Key Outcomes</h3>
            <ul className="lapr-stats">
              {LAPR_STATS.map((stat) => (
                <LearningApproachStat key={stat.id} stat={stat} />
              ))}
            </ul>
          </div>

          {/* Call to action */}
          <div className="lapr-cta">
            <h3 className="lapr-cta__title">Transform your ideas today</h3>
            <a className="lapr-cta__button" href={ctaHref}>
              {ctaLabel}
              <span className="lapr-cta__icon" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a className="lapr-cta__link" href={videoHref}>
              {videoLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(LearningApproach);
