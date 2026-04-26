import React from "react";
import styles from "./Card.module.css";

type CardTone = "default" | "tight";

type CardProps = {
  as?: "article" | "div" | "li" | "section";
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  tone?: CardTone;
};

export function Card({ as = "div", children, className, glass = false, tone = "default" }: CardProps) {
  const Component = as;
  const resolvedClassName = [styles.card, styles[tone], glass ? styles.glass : "", className]
    .filter(Boolean)
    .join(" ");

  return <Component className={resolvedClassName}>{children}</Component>;
}
