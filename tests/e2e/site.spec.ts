import { expect, test } from "@playwright/test";

test.describe("scrollytelling site", () => {
  test("homepage sections render in order and links navigate", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Signals In Motion" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /commuters experience delays/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /each phase narrows the work/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /three initial steps outline the story arc/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /phase 0 establishes the foundation/i })).toBeVisible();

    await page.getByRole("link", { name: "View process page" }).click();
    await expect(page).toHaveURL(/\/process\/?$/);
    await expect(page.getByRole("heading", { name: /the process page turns the assignment workflow/i })).toBeVisible();

    await page.getByRole("link", { name: "Specs" }).click();
    await expect(page).toHaveURL(/\/specs\/?$/);
    await expect(page.getByRole("heading", { name: /the specs page summarizes/i })).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test("scroll reaches story sections and sticky visual stays usable", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("1/3")).toBeVisible();
    const stepTwo = page.locator('[data-step-id="step-2"]');

    await stepTwo.evaluate((element) => element.scrollIntoView({ behavior: "auto", block: "center" }));
    await expect(stepTwo).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Small disruptions cascade across the corridor" }).first()).toBeVisible();
    await expect(page.getByText("1/3")).toBeVisible();

    await page.getByRole("button", { name: /jump to reliable signals change commuter behavior/i }).click();
    await expect(page.getByText("3/3")).toBeVisible();
  });

  test("direct navigation and invalid route handling work", async ({ page }) => {
    await page.goto("/process/");
    await expect(page.getByRole("heading", { name: /the process page turns the assignment workflow/i })).toBeVisible();

    await page.goto("/specs/");
    await expect(page.getByRole("heading", { name: /the specs page summarizes/i })).toBeVisible();

    await page.goto("/missing/");
    await expect(page.getByRole("heading", { name: /the route you requested is not part of this static export/i })).toBeVisible();
  });

  test("mobile viewport keeps navigation and story content usable", async ({ page, isMobile }) => {
    test.skip(!isMobile, "This coverage is only meaningful on the mobile project.");

    await page.goto("/");

    const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });

    await expect(primaryNavigation.getByRole("link", { name: "Process" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Signals In Motion" })).toBeVisible();

    await page.getByText("Step 3").scrollIntoViewIfNeeded();
    await expect(page.getByText("Reliable signals change commuter behavior").last()).toBeVisible();
    await page.getByRole("button", { name: /jump to reliable signals change commuter behavior/i }).click();
    await expect(page.getByText("3/3")).toBeVisible();
  });
});
