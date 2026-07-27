import Button from "@/components/ui/button/Button";
import styles from "./vision.module.css";

export default function Vision() { 
  return (
    <section className={styles.vision}>
      <div className={styles.visionContent}>
        <h3>Creo en un entorno de trabajo totalmente remoto, positivo, inspirador y gratificante que fomente el crecimiento, la creatividad y la innovación.</h3>
        <Button btnText="Quiero contactar" />
          
      </div>
    </section>
  );
}