import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { StoryPreview } from "@/components/StoryPreview";
import { siteContent } from "@/content/siteContent";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.hero} id="top" aria-labelledby="hero-title">
          <div className={styles.heroCard}>
            <p className={styles.eyebrow}>{siteContent.hero.kicker}</p>
            <h1 className={styles.title} id="hero-title">
              {siteContent.hero.title}
            </h1>
            <p className={styles.subtitle}>{siteContent.hero.subtitle}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="#story">
                Jump to story steps
              </Link>
              <Link className={styles.secondaryAction} href="/process">
                View process page
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image
              className={styles.heroImage}
              src={siteContent.hero.image.src}
              alt={siteContent.hero.image.alt}
              width={960}
              height={720}
              priority
            />
          </div>
        </section>

        <StoryPreview content={siteContent} />
      </main>
    </>
  );
}
