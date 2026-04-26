import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getClosestStepId, ScrollyStory } from "./ScrollyStory";
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

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
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

  it("selects the step nearest the viewport center for refresh-style layout syncing", () => {
    const makeStep = (id: string, top: number, bottom: number) => {
      const element = document.createElement("div");

      element.dataset.stepId = id;

      Object.defineProperty(element, "getBoundingClientRect", {
        configurable: true,
        value: () => ({
          bottom,
          height: bottom - top,
          left: 0,
          right: 0,
          top,
          width: 300,
          x: 0,
          y: top,
          toJSON: () => ({}),
        }),
      });

      return element;
    };

    const selectedStepId = getClosestStepId([
      makeStep("step-1", -280, 140),
      makeStep("step-2", 780, 1020),
      makeStep("step-3", 360, 720),
    ]);

    expect(selectedStepId).toBe("step-3");
  });

  it("lets progress buttons jump to a step without waiting for observer updates", async () => {
    const user = userEvent.setup();

    render(
      <ScrollyStory
        description={siteContent.story.description}
        steps={siteContent.storySteps}
        title={siteContent.story.title}
      />,
    );

    await user.click(screen.getByRole("button", { name: /jump to small disruptions cascade across the corridor/i }));

    expect(screen.getByText("2/3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /jump to small disruptions cascade across the corridor/i })).toHaveAttribute(
      "aria-current",
      "step",
    );
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

  it("does not crash when section data is missing", () => {
    render(<ScrollyStory description={siteContent.story.description} steps={[]} title={siteContent.story.title} />);

    expect(screen.getByText("Story steps are still being assembled.")).toBeInTheDocument();
    expect(screen.getByText("0/0")).toBeInTheDocument();
  });
});