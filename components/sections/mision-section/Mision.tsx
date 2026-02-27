import GraphEyeIcon from "../../ui/icons/GraphEye";
import styles from "./mision.module.css";

export default function Mision() { 
  return (
    <section className={styles.mision}>
      <div className={styles.misionContent}>
        <div className={styles.misionImage}>
         <GraphEyeIcon style={{ color:"var(--color-dark" }} />
        </div>
        <h3>Código que <span>respeta</span> el diseño. Elimino la fricción técnica para que el <span>resultado final</span> sea exactamente el que planeaste, priorizando el <span>rendimiento</span> y la integridad visual de la web.</h3>
      </div>
    </section>
  );
}