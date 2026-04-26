import Image from "next/image";
import styles from "./header-nav.module.css";
export default function HeaderNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/imagotipo-white-giocode.png"
          alt="Giocode logo"
          width={159}
          height={40}
          priority
        />
      </div>
      <div className={styles.containerNavLinks}>
        <a
          href="https://www.behance.net/porfolio-jorgedeleon"
          target="_blank" rel="noopener noreferrer"
          className={styles.navLink}
        >
          Porfolio
        </a>
      </div>
    </nav>
  )
}