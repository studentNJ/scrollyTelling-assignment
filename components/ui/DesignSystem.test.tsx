import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Section } from "./Section";

describe("design system primitives", () => {
  it("renders reusable button, card, and section content consistently", () => {
    render(
      <Card>
        <Section description="Shared section copy" eyebrow="System" id="design" title="Reusable building blocks">
          <Button href="/process">View process</Button>
        </Section>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Reusable building blocks" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View process" })).toHaveAttribute("href", "/process");
    expect(screen.getByText("Shared section copy")).toBeInTheDocument();
  });

  it("renders without optional eyebrow or description so missing style hooks do not break layout", () => {
    render(
      <Card>
        <Section title="Minimal section">
          <p>Fallback content still renders.</p>
        </Section>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Minimal section" })).toBeInTheDocument();
    expect(screen.getByText("Fallback content still renders.")).toBeInTheDocument();
  });

  it("handles extreme text length inside shared section and card primitives", () => {
    const longTitle = `${"Extended typography ".repeat(10)}system`;
    const longCopy = `${"Long-form descriptive content ".repeat(24)}remains readable.`;

    render(
      <Card tone="tight">
        <Section description={longCopy} title={longTitle} />
      </Card>,
    );

    expect(screen.getByRole("heading", { name: longTitle })).toBeInTheDocument();
    expect(screen.getByText(/remains readable\./)).toBeInTheDocument();
  });
});