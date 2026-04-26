import React from "react";
import styles from "./Section.module.css";

type SectionTone = "default" | "pageTitle" | "display";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  tone?: SectionTone;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  titleClassName,
  tone = "default",
}: SectionProps) {
  const titleId = id ? `${id}-title` : undefined;
  const resolvedTitleClassName = [styles.title, tone !== "default" ? styles[tone] : "", titleClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <section aria-labelledby={titleId} className={[styles.section, className].filter(Boolean).join(" ")} id={id}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={resolvedTitleClassName} id={titleId}>
        {title}
      </h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </section>
  );
}
