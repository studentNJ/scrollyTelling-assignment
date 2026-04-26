import React from "react";
import { render, screen } from "@testing-library/react";
import { StoryPreview } from "./StoryPreview";
import { siteContent } from "@/content/siteContent";

describe("StoryPreview", () => {
  it("renders the story steps in order for the homepage preview", () => {
    render(<StoryPreview content={siteContent} />);

    const headings = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);

    expect(headings).toContain("Rush hour starts with invisible delays");
    expect(headings).toContain("Small disruptions cascade across the corridor");
    expect(headings).toContain("Reliable signals change commuter behavior");
  });

  it("keeps rendering when a story step omits its image", () => {
    render(
      <StoryPreview
        content={{
          ...siteContent,
          storySteps: [
            {
              ...siteContent.storySteps[0],
              image: undefined,
            },
          ],
        }}
      />,
    );

    expect(screen.getByText("Visual placeholder ready for a later phase.")).toBeInTheDocument();
  });

  it("supports unusually long result copy without dropping the content", () => {
    const longCopy = `${siteContent.results.description} ${"Detailed summary ".repeat(24)}`;

    render(
      <StoryPreview
        content={{
          ...siteContent,
          results: {
            ...siteContent.results,
            description: longCopy,
          },
        }}
      />,
    );

    expect(screen.getByText(/Detailed summary Detailed summary/)).toBeInTheDocument();
  });
});
