import Link from "next/link";
import styles from "./process/page.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="not-found-title">
        <p className={styles.eyebrow}>Page not found</p>
        <h1 className={styles.title} id="not-found-title">
          The route you requested is not part of this static export.
        </h1>
        <p className={styles.lede}>
          Return to the homepage to continue the scrollytelling experience.
        </p>
        <p>
          <Link href="/">Back to home</Link>
        </p>
      </section>
    </main>
  );
}
