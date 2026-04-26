import React from "react";
import { act, render, screen } from "@testing-library/react";
import { ScrollyStory } from "./ScrollyStory";
import { siteContent } from "@/content/siteContent";

type ObserverEntryShape = {
  intersectionRatio: number;
  isIntersecting: boolean;
  target: Element;
};

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  callback: IntersectionObserverCallback;
  observed = new Set<Element>();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  disconnect() {
    this.observed.clear();
  }

  observe = (element: Element) => {
    this.observed.add(element);
  };

  unobserve = (element: Element) => {
    this.observed.delete(element);
  };

  trigger(entries: ObserverEntryShape[]) {
    this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
  }
}

describe("ScrollyStory", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      value: MockIntersectionObserver,
      writable: true,
    });
  });

  it("shows the first step as active before scroll updates arrive", () => {
    render(
      <ScrollyStory
        description={siteContent.story.description}
        steps={siteContent.storySteps}
        title={siteContent.story.title}
      />,
    );

    expect(screen.getByText("1/3")).toBeInTheDocument();
    expect(screen.getAllByText("Rush hour starts with invisible delays")[0]).toBeInTheDocument();
  });

  it("updates the active visual when a later step becomes most visible", () => {
    render(
      <ScrollyStory
        description={siteContent.story.description}
        steps={siteContent.storySteps}
        title={siteContent.story.title}
      />,
    );

    const observer = MockIntersectionObserver.instances[0];
    const stepElements = screen.getAllByText(/Step /).map((node) => node.parentElement?.parentElement?.parentElement);

    act(() => {
      observer.trigger([
        {
          intersectionRatio: 0.1,
          isIntersecting: true,
          target: stepElements[0]!.querySelector("[data-scrolly-step]")!,
        },
        {
          intersectionRatio: 0.8,
          isIntersecting: true,
          target: stepElements[1]!.querySelector("[data-scrolly-step]")!,
        },
      ]);
    });

    expect(screen.getByText("2/3")).toBeInTheDocument();
    expect(screen.getAllByText("Small disruptions cascade across the corridor")[0]).toBeInTheDocument();
  });

  it("keeps rendering when the active step has no image", () => {
    render(
      <ScrollyStory
        description={siteContent.story.description}
        steps={[{ ...siteContent.storySteps[2], image: undefined }]}
        title={siteContent.story.title}
      />,
    );

    expect(screen.getByText("Visual placeholder ready for a later phase.")).toBeInTheDocument();
  });
});