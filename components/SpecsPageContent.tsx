import React from "react";
import { siteContent } from "@/content/siteContent";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import styles from "@/app/process/page.module.css";

type SpecsPageContentProps = {
  summaries?: typeof siteContent.specsPage.summaries;
};

export function SpecsPageContent({ summaries = siteContent.specsPage.summaries }: SpecsPageContentProps) {
  return (
    <div className={styles.sectionStack}>
      <Card as="section">
        <Section
          description={siteContent.specsPage.description}
          eyebrow="Specification summary"
          id="specs"
          title={siteContent.specsPage.title}
          tone="pageTitle"
        >
          <div className={styles.actionRow}>
            <Button href="/process" variant="secondary">Open process page</Button>
            <Button href="/">Back to homepage</Button>
          </div>
        </Section>
      </Card>

      <Card as="section">
        <Section eyebrow="Documents" id="spec-documents" title="Each spec controls a different part of the build.">
          {summaries.length > 0 ? (
            <div className={styles.cardGrid}>
              {summaries.map((summary) => (
                <Card as="article" className={styles.cardCopy} key={summary.id} tone="tight">
                  <h3>{summary.title}</h3>
                  <p>{summary.description}</p>
                  <p className={styles.cardMeta}>{summary.focus}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className={styles.supportCopy}>Spec summaries will appear here when content is available.</p>
          )}
        </Section>
      </Card>
    </div>
  );
}
