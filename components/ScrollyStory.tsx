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

export function getClosestStepId(stepElements: HTMLElement[]) {
  if (typeof window === "undefined" || stepElements.length === 0) {
    return null;
  }

  const viewportCenter = window.innerHeight / 2;

  const rankedSteps = stepElements
    .map((element) => {
      const rect = element.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter);
      const overlapsViewport = rect.bottom > 0 && rect.top < window.innerHeight;

      return {
        distance,
        id: element.dataset.stepId ?? null,
        overlapsViewport,
      };
    })
    .filter((entry): entry is { distance: number; id: string; overlapsViewport: boolean } => Boolean(entry.id));

  const visibleStep = rankedSteps
    .filter((entry) => entry.overlapsViewport)
    .sort((left, right) => left.distance - right.distance)[0];

  if (visibleStep) {
    return visibleStep.id;
  }

  return rankedSteps.sort((left, right) => left.distance - right.distance)[0]?.id ?? null;
}

export function ScrollyStory({ title, description, steps }: ScrollyStoryProps) {
  const [activeStepId, setActiveStepId] = React.useState<string | null>(() => getInitialStep(steps)?.id ?? null);
  const ratiosRef = React.useRef<Record<string, number>>({});
  const stepRefs = React.useRef<Record<string, HTMLElement | null>>({});

  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);
  const activeStep = steps.find((step) => step.id === activeStepId) ?? getInitialStep(steps);

  React.useEffect(() => {
    setActiveStepId(getInitialStep(steps)?.id ?? null);
    stepRefs.current = {};
  }, [steps]);

  React.useEffect(() => {
    if (steps.length === 0) {
      return undefined;
    }

    const stepElements = steps
      .map((step) => stepRefs.current[step.id])
      .filter((element): element is HTMLElement => Boolean(element));

    const syncFromViewport = () => {
      const closestStepId = getClosestStepId(stepElements);

      if (closestStepId) {
        setActiveStepId(closestStepId);
      }
    };

    syncFromViewport();

    window.addEventListener("pageshow", syncFromViewport);
    window.addEventListener("resize", syncFromViewport);

    if (typeof IntersectionObserver === "undefined") {
      return () => {
        window.removeEventListener("pageshow", syncFromViewport);
        window.removeEventListener("resize", syncFromViewport);
      };
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
          return;
        }

        syncFromViewport();
      },
      {
        rootMargin: "-18% 0px -32% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    stepElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", syncFromViewport);
      window.removeEventListener("resize", syncFromViewport);
    };
  }, [steps]);

  const setStepRef = (stepId: string) => (element: HTMLElement | null) => {
    stepRefs.current[stepId] = element;
  };

  const jumpToStep = (stepId: string) => {
    setActiveStepId(stepId);
    stepRefs.current[stepId]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className={styles.root}>
      <Section description={description} eyebrow="Demo" id="story" title={title} />

      <div className={styles.layout}>
        <div className={styles.visualPane}>
          <Card className={styles.visualCard} glass>
            <div className={styles.visualMeta}>
              <p className={styles.visualLabel}>Active chapter</p>
              <p className={styles.visualCounter}>
                {activeStep ? `${activeStepIndex + 1}/${steps.length}` : `0/${steps.length}`}
              </p>
            </div>

            {steps.length > 0 ? (
              <nav aria-label="Story progress" className={styles.progressNav}>
                {steps.map((step, index) => {
                  const isActive = step.id === activeStep?.id;

                  return (
                    <button
                      aria-current={isActive ? "step" : undefined}
                      className={[styles.progressButton, isActive ? styles.progressButtonActive : ""]
                        .filter(Boolean)
                        .join(" ")}
                      key={step.id}
                      onClick={() => jumpToStep(step.id)}
                      type="button"
                    >
                      <span className="srOnly">Jump to {step.title}</span>
                      <span aria-hidden="true">{index + 1}</span>
                    </button>
                  );
                })}
              </nav>
            ) : null}

            {activeStep ? (
              <div className={styles.visualContent} key={activeStep.id}>
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
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3 className={styles.visualTitle}>Story steps are still being assembled.</h3>
                <p className={styles.visualDescription}>Add step content to restore the scroll narrative and sticky visual.</p>
              </div>
            )}
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
                  ref={setStepRef(step.id)}
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
