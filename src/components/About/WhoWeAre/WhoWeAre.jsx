/* ==========================================================================
   WhoWeAre.jsx
   "Who we are" section – intro text, photo with floating topic chips,
   3 feature cards and 6 stat cards.
   Requires: npm i lucide-react
   ========================================================================== */

import { memo } from "react";
import {
  Cpu,
  Lightbulb,
  BarChart3,
  Star,
  Users,
  BadgeCheck,
  BookOpen,
  Box,
  Wifi,
  Bot,
  Code2,
  Brain,
  CircuitBoard,
  Infinity as InfinityIcon,
  Network,
} from "lucide-react";

/* CSS is imported here – no inline styles, no CSS modules */
import "./WhoWeAre.css";

/* Photo – put the file at: src/assets/About/WhoWeAre/who-we-are.png */
import whoWeAreKidsImage from "../../../assets/About/WhoWeAre/who-we-are.png";

/* ==========================================================================
   SECTION 1 – STATIC DATA (defined once, outside the component)
   `tone` picks the colour of the icon bubble (see CSS section 3)
   ========================================================================== */

/* Floating chips around the photo. `position` maps to a CSS modifier class. */
const WHO_WE_ARE_CHIPS = [
  { id: "chip-sensors", Icon: Wifi, label: "Sensors", position: "sensors", tone: "plain" },
  { id: "chip-iot", Icon: Cpu, label: "IoT", position: "iot", tone: "plain" },
  { id: "chip-robotics-top", Icon: Bot, label: "Robotics", position: "robotics-top", tone: "plain" },
  { id: "chip-arduino", Icon: InfinityIcon, label: "Arduino", position: "arduino", tone: "warm" },
  { id: "chip-coding", Icon: Code2, label: "Coding", position: "coding", tone: "rose" },
  { id: "chip-ai", Icon: Brain, label: "AI", position: "ai", tone: "mint" },
  { id: "chip-robotics-left", Icon: Network, label: "Robotics", position: "robotics-left", tone: "lavender" },
];

/* Cards 01 – 03 */
const WHO_WE_ARE_FEATURES = [
  {
    id: "feature-hands-on",
    Icon: Cpu,
    tone: "blue",
    title: "Hands-on Learning",
    text: "Learn by doing and experimenting.",
  },
  {
    id: "feature-creating",
    Icon: Lightbulb,
    tone: "amber",
    title: "Learn by Creating",
    text: "Turn ideas into real projects.",
  },
  {
    id: "feature-skills",
    Icon: BarChart3,
    tone: "purple",
    title: "Future-Ready Skills",
    text: "Build skills for a brighter tomorrow.",
  },
];

/* Cards 04 – 09 */
const WHO_WE_ARE_STATS = [
  { id: "stat-reviews", Icon: Star, tone: "amber", value: "4.9/5", label: "Student Reviews" },
  { id: "stat-students", Icon: Users, tone: "green", value: "200+", label: "Students Trained" },
  { id: "stat-trainers", Icon: BadgeCheck, tone: "purple", value: "\u2713", label: "Certified Trainers" },
  { id: "stat-areas", Icon: BookOpen, tone: "blue", value: "6+", label: "Learning Areas" },
  { id: "stat-projects", Icon: Box, tone: "green", value: "20+", label: "Practical Projects" },
  { id: "stat-hands-on", Icon: CircuitBoard, tone: "purple", value: "100%", label: "Hands-on Learning" },
];

/* Running number shown on every card: 01 … 09 */
const whoWeAreNumber = (index) => String(index + 1).padStart(2, "0");

/* ==========================================================================
   SECTION 2 – FEATURE CARD (memoized, reused for cards 01 – 03)
   ========================================================================== */
const WhoWeAreFeatureCard = memo(function WhoWeAreFeatureCard({
  Icon,
  tone,
  title,
  text,
  number,
}) {
  return (
    <li className="who-we-are__feature">
      <span className="who-we-are__number who-we-are__number--right" aria-hidden="true">
        {number}
      </span>
      <span className={`who-we-are__icon who-we-are__tone--${tone}`} aria-hidden="true">
        <Icon size={24} />
      </span>
      <h3 className="who-we-are__feature-title">{title}</h3>
      <p className="who-we-are__feature-text">{text}</p>
    </li>
  );
});

/* ==========================================================================
   SECTION 3 – STAT CARD (memoized, reused for cards 04 – 09)
   ========================================================================== */
const WhoWeAreStatCard = memo(function WhoWeAreStatCard({
  Icon,
  tone,
  value,
  label,
  number,
}) {
  return (
    <li className="who-we-are__stat">
      <span className="who-we-are__number who-we-are__number--left" aria-hidden="true">
        {number}
      </span>
      <span className={`who-we-are__icon who-we-are__icon--small who-we-are__tone--${tone}`} aria-hidden="true">
        <Icon size={20} />
      </span>
      <strong className="who-we-are__stat-value">{value}</strong>
      <span className="who-we-are__stat-label">{label}</span>
    </li>
  );
});

/* ==========================================================================
   SECTION 4 – FLOATING CHIP (memoized, reused for all 7 topic chips)
   ========================================================================== */
const WhoWeAreChip = memo(function WhoWeAreChip({ Icon, label, position, tone }) {
  return (
    <li
      className={`who-we-are__chip who-we-are__chip--${position} who-we-are__tone--${tone}`}
    >
      <Icon size={26} aria-hidden="true" />
      <span className="who-we-are__chip-label">{label}</span>
    </li>
  );
});

/* ==========================================================================
   SECTION 5 – MAIN COMPONENT
   ========================================================================== */
function WhoWeAre() {
  return (
    <section className="who-we-are" aria-labelledby="who-we-are-heading">
      <div className="who-we-are__container">
        {/* ---------- 5.1 TOP: text (left) + photo with chips (right) ---------- */}
        <div className="who-we-are__top">
          {/* Left – text content */}
          <div className="who-we-are__content">
            <p className="who-we-are__eyebrow">
              <span className="who-we-are__eyebrow-line" aria-hidden="true" />
              Who we are
            </p>

            <h2 id="who-we-are-heading" className="who-we-are__title">
              Learning becomes powerful when kids get to{" "}
              <span className="who-we-are__title-accent">build.</span>
            </h2>

            <p className="who-we-are__lead">
              We create hands-on learning experiences around IOT, electronics,
              Arduino, sensors, robotics, coding and AI. Our goal is to make
              technology learning simple, practical and exciting for every
              child.
            </p>
          </div>

          {/* Right – photo + dashed orbit + floating chips */}
          <div className="who-we-are__visual">
            <span className="who-we-are__orbit" aria-hidden="true" />

            <div className="who-we-are__photo-frame">
              <img
                className="who-we-are__photo"
                src={whoWeAreKidsImage}
                alt="Two children building a robot car with Arduino parts"
                width="716"
                height="561"
                loading="eager"
                decoding="async"
              />
            </div>

            <ul className="who-we-are__chips">
              {WHO_WE_ARE_CHIPS.map(({ id, Icon, label, position, tone }) => (
                <WhoWeAreChip
                  key={id}
                  Icon={Icon}
                  label={label}
                  position={position}
                  tone={tone}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- 5.2 BOTTOM: feature cards (01-03) + stat cards (04-09) ---------- */}
        <div className="who-we-are__bottom">
          <ul className="who-we-are__features">
            {WHO_WE_ARE_FEATURES.map((item, index) => (
              <WhoWeAreFeatureCard
                key={item.id}
                Icon={item.Icon}
                tone={item.tone}
                title={item.title}
                text={item.text}
                number={whoWeAreNumber(index)}
              />
            ))}
          </ul>

          <ul className="who-we-are__stats">
            {WHO_WE_ARE_STATS.map((item, index) => (
              <WhoWeAreStatCard
                key={item.id}
                Icon={item.Icon}
                tone={item.tone}
                value={item.value}
                label={item.label}
                number={whoWeAreNumber(WHO_WE_ARE_FEATURES.length + index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default memo(WhoWeAre);
