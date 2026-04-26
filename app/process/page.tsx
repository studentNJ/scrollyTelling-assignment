import { SiteHeader } from "@/components/SiteHeader";
import { siteContent } from "@/content/siteContent";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import styles from "./page.module.css";

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <Card as="section">
          <Section
            description="This starter page documents the same workflow described in the assignment: establish specs first, implement in small phases, then validate with lint, tests, build output, and QA before moving on."
            eyebrow="Spec-driven workflow"
            id="process"
            title="Building the story in phases keeps scope visible."
            tone="pageTitle"
          >
          <ol className={styles.list}>
            {siteContent.processSteps.map((step, index) => (
              <Card as="li" className={styles.listItem} key={step.id} tone="tight">
                <strong>{index + 1}. {step.title}</strong>
                <p>{step.description}</p>
              </Card>
            ))}
          </ol>
          </Section>
        </Card>
      </main>
    </>
  );
}
