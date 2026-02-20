import styles from "./maintenance.module.css";

export default function Home() {
  return (
    <div className={styles.card}>
      <main className={styles.main}>  
        <h2 >¡Estamos en mantenimiento!</h2>
        <p> En <span>Giocode</span> estamos redefiniendo nuestra presencia digital para elevar la tuya. Aunque la web esté en mantenimiento, mi disponibilidad no lo está.
          <a
            href="https://wa.me/+34661963517?text=Hola%20Giocode%2C%20he%20visto%20que%20la%20web%20est%C3%A1%20en%20mantenimiento.%20Me%20gustar%C3%ADa%20contactar%20contigo."
            target="_blank"
            rel="noopener noreferrer">
            ¿Hablamos?
          </a>
        </p>

      </main>
    </div>
  );
}
