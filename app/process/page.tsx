import { SiteHeader } from "@/components/SiteHeader";
import { siteContent } from "@/content/siteContent";
import styles from "./page.module.css";

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.card} aria-labelledby="process-title">
          <p className={styles.eyebrow}>Spec-driven workflow</p>
          <h1 className={styles.title} id="process-title">
            Building the story in phases keeps scope visible.
          </h1>
          <p className={styles.lede}>
            This starter page documents the same workflow described in the assignment: establish
            specs first, implement in small phases, then validate with lint, tests, build output,
            and QA before moving on.
          </p>
          <ol className={styles.list}>
            {siteContent.processSteps.map((step, index) => (
              <li className={styles.listItem} key={step.id}>
                <strong>
                  {index + 1}. {step.title}
                </strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
