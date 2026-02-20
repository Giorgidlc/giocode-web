import Image from "next/image";
import styles from "./page.module.css";
import MaintenanceCard from "@/components/maintenance/MaintenanceCard";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/imagotipo-white-giocode.png"
          alt="Giocode logo"
          width={159}
          height={40}
          priority
        />
        <div className={styles.intro}>
          <h1>Devs <span> + </span> Creatividad</h1>
          <p>
            Colaboramos con creativos para transformar sus ideas en experiencias digitales memorables, combinando código limpio con un toque de innovación.
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
           href="https://wa.me/+34661963517?text=Hola%20Giocode%2C%20he%20visto%20que%20la%20web%20est%C3%A1%20en%20mantenimiento.%20Me%20gustar%C3%ADa%20contactar%20contigo."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/arrow_forward.svg"
              alt="Arrow Forward"
              width={16}
              height={16}
            />
            Contáctame
          </a>
        </div>
      </main>
      <MaintenanceCard />
    </div>
  );
}
