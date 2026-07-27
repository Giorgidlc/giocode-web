import styles from "./hero-section.module.css";

import Image from "next/image";

export default function HeroSection() {
  return (
    <div className={styles.intro}>
      <div className={styles.introContent}>
        <h1 className={styles.introTitle}>
          Código <span> + </span> Creatividad
        </h1>
        <p className={styles.introSubtitle}>
          El partner tecnológico para tus grandes ideas
        </p>
        <p className={styles.introText}>
          Ayudo a creativos y marcas a materializar sus proyectos más complejos mediante tecnologías modernas y diseño funcional.
        </p>
      </div>
      <div className={styles.introImage}>
        <Image
          src="/hero-graph.svg"
          alt="Hero Graph"
          width={1200}
          height={600}
        />
      </div>
      
    </div>
  );
}
