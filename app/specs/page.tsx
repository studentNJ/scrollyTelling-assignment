import React from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpecsPageContent } from "@/components/SpecsPageContent";
import styles from "../process/page.module.css";

export default function SpecsPage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <SpecsPageContent />
      </main>
    </>
  );
}
