import styles from "./value-proposition.module.css";

export default function ValueProposition() {
  return (
    <section className={styles.valueProposition}>
      <h2>
        Sabemos lo <span>difícil</span> que es para las agencias y diseñadores <span>encontrar</span> los <span>desarrolladores</span> adecuados
      </h2>
      <p>
        Encontrar desarrolladores que realmente entiendan el trabajo de un creativo es un reto. En <span>Giocode</span>, nos especializamos en colaborar
        estrechamente con agencias y profesionales del diseño para convertir sus ideas en realidad.
      </p>
    </section>
  );
}
