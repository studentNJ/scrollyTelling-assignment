import React from "react";
import type { SiteContent } from "@/content/siteContent";
import { ScrollyStory } from "@/components/ScrollyStory";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import styles from "./StoryPreview.module.css";

type StoryPreviewProps = {
  content: SiteContent;
};

export function StoryPreview({ content }: StoryPreviewProps) {
  return (
    <div className={styles.grid}>
      <Card as="section">
        <Section description={content.problem.description} eyebrow="Problem" id="problem" title={content.problem.title} />
      </Card>

      <Card as="section">
        <Section eyebrow="Process" id="workflow" title={content.process.title}>
        <div className={styles.processGrid}>
          {content.processSteps.map((step) => (
            <Card as="article" key={step.id} tone="tight">
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p>{step.description}</p>
            </Card>
          ))}
        </div>
        </Section>
      </Card>

      <Card as="section">
        <ScrollyStory description={content.story.description} steps={content.storySteps} title={content.story.title} />
      </Card>

      <Card as="section">
        <Section description={content.results.description} eyebrow="Results" id="results" title={content.results.title} />
      </Card>

      <Card as="section">
        <Section eyebrow="Call to action" id="cta" title={content.cta.title}>
        <div className={styles.ctaGrid}>
          {content.cta.links.map((link) => (
            <Card as="article" key={link.label} tone="tight">
              <h3 className={styles.cardTitle}>{link.label}</h3>
              <p>{link.description}</p>
              {link.href ? (
                <Button className={styles.ctaLink} href={link.href} target="_blank" rel="noreferrer" variant="secondary">
                  Open link
                </Button>
              ) : (
                <p className={styles.placeholder}>Add the final URL in the deployment phase.</p>
              )}
            </Card>
          ))}
        </div>
        </Section>
      </Card>
    </div>
  );
}
