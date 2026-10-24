/* ==========================================================================
   WhyTechnology.jsx
   Technology education section – dark glass design, fits one window.
   ========================================================================== */

import { memo, useCallback, useState } from "react";
import {
  Lightbulb,
  Target,
  Brain,
  Wrench,
  Rocket,
  BarChart3,
  ArrowRight,
} from "lucide-react";

// ===== SECTION 1: Styles and image imports =====
import "./WhyTechnology.css";
import whyTechPhoto from "../../../assets/About/WhyTechnology/why-technology.png";

// ===== SECTION 2: Static data =====
const WHY_TECH_SKILLS = [
  { id: "creativity", Icon: Lightbulb, tone: "blue", label: "Creativity" },
  { id: "problem-solving", Icon: Target, tone: "cyan", label: "Problem Solving" },
  { id: "logical-thinking", Icon: Brain, tone: "violet", label: "Logical Thinking" },
  { id: "practical-skills", Icon: Wrench, tone: "blue", label: "Practical Skills" },
  { id: "innovation", Icon: Rocket, tone: "blue", label: "Innovation" },
  { id: "confidence", Icon: BarChart3, tone: "blue", label: "Confidence" },
];

const WHY_TECH_STATS = [
  { id: "hands-on", value: "92%", label: "Hands-On", fill: 92 },
  { id: "solutions", value: "100+", label: "Real-world Solutions", fill: 62, white: true },
];

// ===== SECTION 3: CTA URL safety helper =====
const whyTechSafeHref = (url) => {
  if (typeof url !== "string") return "#";

  const value = url.trim();

  // eslint-disable-next-line no-control-regex
  if (!value || /[\u0000-\u001F\u007F\\]/.test(value)) {
    return "#";
  }

  if (
    value.startsWith("#") ||
    /^(?:\/(?!\/)|\.{1,2}\/)/.test(value) ||
    /^(?:https?:\/\/|mailto:|tel:)/i.test(value)
  ) {
    return value;
  }

  return "#";
};

// ===== SECTION 4: Skill card =====
const WhyTechSkillRow = memo(function WhyTechSkillRow({ Icon, tone, label }) {
  if (!Icon) return null;

  return (
    <li className={`why-tech__skill why-tech__tone--${tone}`}>
      <span className="why-tech__skill-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.8} />
      </span>

      <span className="why-tech__skill-label">{label}</span>
    </li>
  );
});

// ===== SECTION 5: Main component =====
function WhyTechnology({ ctaHref = "#courses", photoSrc = whyTechPhoto }) {
  const safeCtaHref = whyTechSafeHref(ctaHref);
  const isExternalCta = /^https?:\/\//i.test(safeCtaHref);

  const [photoFailed, setPhotoFailed] = useState(false);
  const handlePhotoError = useCallback(() => setPhotoFailed(true), []);

  return (
    <section className="why-tech" aria-labelledby="why-tech-heading">
      <div className="why-tech__ambient" aria-hidden="true" />

      <div className="why-tech__inner">
        {/* Left content */}
        <div className="why-tech__content">
          <p className="why-tech__eyebrow">
            <span className="why-tech__eyebrow-pill">
              <span className="why-tech__eyebrow-dot" aria-hidden="true" />
              Why technology?
            </span>
            <span className="why-tech__eyebrow-line" aria-hidden="true" />
          </p>

          <h2 id="why-tech-heading" className="why-tech__title">
            Skills that go beyond
            <span className="why-tech__title-accent">the classroom</span>
          </h2>

          <p className="why-tech__lead">
            Technology projects encourage children to think, test, make
            mistakes, solve problems and explain what they build.
          </p>

          <ul
            className="why-tech__skills"
            role="list"
            aria-label="Skills children develop"
          >
            {WHY_TECH_SKILLS.map((skill) => (
              <WhyTechSkillRow
                key={skill.id}
                Icon={skill.Icon}
                tone={skill.tone}
                label={skill.label}
              />
            ))}
          </ul>

          <a
            className="why-tech__btn"
            href={safeCtaHref}
            rel={isExternalCta ? "noopener noreferrer" : undefined}
          >
            <span>Explore Courses</span>
            <ArrowRight
              className="why-tech__btn-arrow"
              size={22}
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Right column: photo, then stats right below it */}
        <div className="why-tech__aside">
          <div className="why-tech__visual" aria-hidden="true">
            {!photoFailed && (
              <img
                className="why-tech__photo"
                src={photoSrc}
                alt=""
                loading="lazy"
                decoding="async"
                onError={handlePhotoError}
              />
            )}
          </div>

          <ul className="why-tech__stats" role="list" aria-label="Highlights">
            {WHY_TECH_STATS.map((stat) => (
              <li key={stat.id} className="why-tech__stat">
                <span className="why-tech__stat-text">
                  <span
                    className={`why-tech__stat-value${
                      stat.white ? " why-tech__stat-value--white" : ""
                    }`}
                  >
                    {stat.value}
                  </span>{" "}
                  {stat.label}
                </span>
                <span
                  className="why-tech__stat-bar"
                  style={{ "--why-tech-fill": `${stat.fill}%` }}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ===== SECTION 6: Export =====
export default memo(WhyTechnology);
