import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { StoryPreview } from "@/components/StoryPreview";
import { siteContent } from "@/content/siteContent";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.hero} id="top" aria-labelledby="top-title">
          <Card className={styles.heroContent} glass>
            <Section
              description={siteContent.hero.subtitle}
              eyebrow={siteContent.hero.kicker}
              id="top"
              title={siteContent.hero.title}
              titleClassName={styles.heroTitle}
              tone="display"
            />
            <div className={styles.heroActions}>
              <Button href="#story">
                Jump to story steps
              </Button>
              <Button href="/process" variant="secondary">
                View process page
              </Button>
            </div>
          </Card>

          <Card className={styles.heroVisual} glass>
            <Image
              className={styles.heroImage}
              src={siteContent.hero.image.src}
              alt={siteContent.hero.image.alt}
              width={960}
              height={720}
              priority
            />
          </Card>
        </section>

        <StoryPreview content={siteContent} />
      </main>
    </>
  );
}
