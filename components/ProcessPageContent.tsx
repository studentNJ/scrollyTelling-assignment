import React from "react";
import { siteContent } from "@/content/siteContent";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import styles from "@/app/process/page.module.css";

type ProcessPageContentProps = {
  checkpoints?: typeof siteContent.processPage.checkpoints;
  steps?: typeof siteContent.processSteps;
  workflowHighlights?: typeof siteContent.processPage.workflowHighlights;
};

export function ProcessPageContent({
  checkpoints = siteContent.processPage.checkpoints,
  steps = siteContent.processSteps,
  workflowHighlights = siteContent.processPage.workflowHighlights,
}: ProcessPageContentProps) {
  const hasWorkflowHighlights = workflowHighlights.length > 0;
  const hasCheckpoints = checkpoints.length > 0;

  return (
    <div className={styles.sectionStack}>
      <Card as="section">
        <Section
          description={siteContent.processPage.description}
          eyebrow="Spec-driven workflow"
          id="process"
          title={siteContent.processPage.title}
          tone="pageTitle"
        >
          <div className={styles.actionRow}>
            <Button href="/specs" variant="secondary">Review spec summary</Button>
            <Button href="/#story">Return to story</Button>
          </div>
        </Section>
      </Card>

      <Card as="section">
        <Section
          description={siteContent.processPage.workflowDescription}
          eyebrow="Workflow"
          id="workflow-guide"
          title={siteContent.processPage.workflowTitle}
        >
          {hasWorkflowHighlights ? (
            <div className={styles.cardGrid}>
              {workflowHighlights.map((highlight) => (
                <Card as="article" className={styles.cardCopy} key={highlight.id} tone="tight">
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                  <p className={styles.cardMeta}>{highlight.deliverable}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className={styles.supportCopy}>Workflow highlights will appear here as the page content expands.</p>
          )}
        </Section>
      </Card>

      <Card as="section">
        <Section eyebrow="Phases" id="phase-sequence" title="The assignment moves through defined slices.">
          <ol className={styles.list}>
            {steps.map((step, index) => (
              <Card as="li" className={styles.listItem} key={step.id} tone="tight">
                <strong>{index + 1}. {step.title}</strong>
                <p>{step.description}</p>
              </Card>
            ))}
          </ol>
        </Section>
      </Card>

      <Card as="section">
        <Section eyebrow="Checkpoints" id="phase-checkpoints" title={siteContent.processPage.checkpointsTitle}>
          {hasCheckpoints ? (
            <ul className={styles.list}>
              {checkpoints.map((checkpoint) => (
                <Card as="li" className={styles.listItem} key={checkpoint} tone="tight">
                  <p>{checkpoint}</p>
                </Card>
              ))}
            </ul>
          ) : (
            <p className={styles.supportCopy}>Completion checkpoints will be listed here when page data is available.</p>
          )}
        </Section>
      </Card>
    </div>
  );
}
