import React from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/specs", label: "Specs" },
  { href: "/#story", label: "Story" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          Signals In Motion
        </Link>
        <nav aria-label="Primary navigation" className={styles.nav}>
          {navItems.map((item) => (
            <Link className={styles.link} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
