import Image from "next/image";
import styles from "./mision.module.css";

export default function Mision() { 
  return (
    <section className={styles.mision}>
      <div className={styles.misionContent}>
        <div className={styles.misionImage}>
          <Image
            src="/mision-graph.svg"
            alt="Mision Graph"
            width={1200}
            height={600}
          />
        </div>
        <h3>Nuestra misión es <span>ayudar</span> a los creativos a <span>disfrutar</span> de cada proyecto web</h3>
      </div>
    </section>
  );
}