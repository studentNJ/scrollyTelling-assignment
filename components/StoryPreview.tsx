import React from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/siteContent";
import styles from "./StoryPreview.module.css";

type StoryPreviewProps = {
  content: SiteContent;
};

export function StoryPreview({ content }: StoryPreviewProps) {
  return (
    <div className={styles.grid}>
      <section className={styles.section} id="problem" aria-labelledby="problem-title">
        <p className={styles.eyebrow}>Problem</p>
        <h2 className={styles.heading} id="problem-title">
          {content.problem.title}
        </h2>
        <p className={styles.copy}>{content.problem.description}</p>
      </section>

      <section className={styles.section} id="workflow" aria-labelledby="workflow-title">
        <p className={styles.eyebrow}>Process</p>
        <h2 className={styles.heading} id="workflow-title">
          {content.process.title}
        </h2>
        <div className={styles.processGrid}>
          {content.processSteps.map((step) => (
            <article className={styles.processCard} key={step.id}>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="story" aria-labelledby="story-title">
        <p className={styles.eyebrow}>Demo</p>
        <h2 className={styles.heading} id="story-title">
          {content.story.title}
        </h2>
        <p className={styles.copy}>{content.story.description}</p>
        <div className={styles.stepGrid}>
          {content.storySteps.map((step) => (
            <article className={styles.stepCard} key={step.id}>
              <div>
                <p className={styles.stat}>{step.stat}</p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              {step.image ? (
                <Image
                  className={styles.stepImage}
                  src={step.image.src}
                  alt={step.image.alt}
                  width={520}
                  height={360}
                />
              ) : (
                <div className={styles.stepFallback}>
                  <p className={styles.placeholder}>Visual placeholder ready for a later phase.</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="results" aria-labelledby="results-title">
        <p className={styles.eyebrow}>Results</p>
        <h2 className={styles.heading} id="results-title">
          {content.results.title}
        </h2>
        <p className={styles.copy}>{content.results.description}</p>
      </section>

      <section className={styles.section} id="cta" aria-labelledby="cta-title">
        <p className={styles.eyebrow}>Call to action</p>
        <h2 className={styles.heading} id="cta-title">
          {content.cta.title}
        </h2>
        <div className={styles.ctaGrid}>
          {content.cta.links.map((link) => (
            <article className={styles.ctaCard} key={link.label}>
              <h3 className={styles.cardTitle}>{link.label}</h3>
              <p>{link.description}</p>
              {link.href ? (
                <a className={styles.ctaLink} href={link.href} target="_blank" rel="noreferrer">
                  Open link
                </a>
              ) : (
                <p className={styles.placeholder}>Add the final URL in the deployment phase.</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
