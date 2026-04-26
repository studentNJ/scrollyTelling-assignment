import React from "react";
import { render, screen } from "@testing-library/react";
import { ProcessPageContent } from "./ProcessPageContent";
import { SpecsPageContent } from "./SpecsPageContent";
import { SiteHeader } from "./SiteHeader";

describe("content pages", () => {
  it("renders workflow and navigation content on the process page", () => {
    render(<ProcessPageContent />);

    expect(screen.getByRole("heading", { name: /the process page turns the assignment workflow/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /review spec summary/i })).toHaveAttribute("href", "/specs");
    expect(screen.getByText("Clear implementation target")).toBeInTheDocument();
  });

  it("renders spec summaries and direct links on the specs page", () => {
    render(<SpecsPageContent />);

    expect(screen.getByRole("heading", { name: /the specs page summarizes/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open process page/i })).toHaveAttribute("href", "/process");
    expect(screen.getByText("Project scope and success criteria")).toBeInTheDocument();
  });

  it("keeps rendering when page content collections are missing", () => {
    render(<SpecsPageContent summaries={[]} />);

    expect(screen.getByText("Spec summaries will appear here when content is available.")).toBeInTheDocument();
  });

  it("includes direct navigation links for content pages in the site header", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Process" })).toHaveAttribute("href", "/process");
    expect(screen.getByRole("link", { name: "Specs" })).toHaveAttribute("href", "/specs");
  });
});