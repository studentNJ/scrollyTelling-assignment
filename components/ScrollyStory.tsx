"use client";

import React from "react";
import Image from "next/image";
import type { StoryStep } from "@/content/siteContent";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import styles from "./ScrollyStory.module.css";

type ScrollyStoryProps = {
  title: string;
  description: string;
  steps: StoryStep[];
};

function getInitialStep(steps: StoryStep[]) {
  return steps[0] ?? null;
}

export function ScrollyStory({ title, description, steps }: ScrollyStoryProps) {
  const [activeStepId, setActiveStepId] = React.useState<string | null>(() => getInitialStep(steps)?.id ?? null);
  const ratiosRef = React.useRef<Record<string, number>>({});

  React.useEffect(() => {
    setActiveStepId(getInitialStep(steps)?.id ?? null);
  }, [steps]);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || steps.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const stepId = entry.target.getAttribute("data-step-id");

          if (!stepId) {
            continue;
          }

          ratiosRef.current[stepId] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }

        const nextStepId = Object.entries(ratiosRef.current)
          .sort((left, right) => right[1] - left[1])
          .find(([, ratio]) => ratio > 0)?.[0];

        if (nextStepId) {
          setActiveStepId(nextStepId);
        }
      },
      {
        rootMargin: "-18% 0px -32% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    const stepElements = document.querySelectorAll<HTMLElement>("[data-scrolly-step]");

    stepElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [steps]);

  const activeStep = steps.find((step) => step.id === activeStepId) ?? getInitialStep(steps);

  return (
    <div className={styles.root}>
      <Section description={description} eyebrow="Demo" id="story" title={title} />

      <div className={styles.layout}>
        <div className={styles.visualPane}>
          <Card className={styles.visualCard} glass>
            <div className={styles.visualMeta}>
              <p className={styles.visualLabel}>Active chapter</p>
              <p className={styles.visualCounter}>
                {activeStep ? `${steps.findIndex((step) => step.id === activeStep.id) + 1}/${steps.length}` : `0/${steps.length}`}
              </p>
            </div>

            {activeStep ? (
              <>
                <p className={styles.visualStat}>{activeStep.stat}</p>
                <h3 className={styles.visualTitle}>{activeStep.title}</h3>
                <p className={styles.visualDescription}>{activeStep.description}</p>
                {activeStep.image ? (
                  <Image
                    alt={activeStep.image.alt}
                    className={styles.visualFrame}
                    height={560}
                    priority
                    src={activeStep.image.src}
                    width={720}
                  />
                ) : (
                  <div className={styles.visualFallback}>
                    <p>Visual placeholder ready for a later phase.</p>
                  </div>
                )}
              </>
            ) : null}
          </Card>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => {
            const isActive = step.id === activeStep?.id;

            return (
              <Card
                as="article"
                className={[styles.step, isActive ? styles.stepActive : ""].filter(Boolean).join(" ")}
                key={step.id}
                tone="tight"
              >
                <div
                  aria-current={isActive ? "step" : undefined}
                  data-scrolly-step
                  data-step-id={step.id}
                >
                  <div className={styles.stepMeta}>
                    <p className={styles.stepIndex}>Step {index + 1}</p>
                    <p className={styles.stepStat}>{step.stat}</p>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
