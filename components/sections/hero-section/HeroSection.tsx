import styles from "./hero-section.module.css";

import Image from "next/image";

export default function HeroSection() {
  return (
    <div className={styles.intro}>
      <div className={styles.introContent}>
        <h1 className={styles.introTitle}>
          Devs <span> + </span> Creatividad
        </h1>
        <p className={styles.introSubtitle}>
          Expertos con los que amarás trabajar
        </p>
        <p className={styles.introText}>
          Colaboramos con creativos para transformar sus ideas en experiencias digitales memorables, combinando código limpio con un toque de innovación.
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
