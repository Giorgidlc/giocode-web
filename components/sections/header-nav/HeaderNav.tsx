import Image from "next/image";
import Link from "next/link";
import styles from "./header-nav.module.css";
export default function HeaderNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Link href="/" aria-label="Volver a la página principal">
          <Image
            className={styles.logo}
            src="/imagotipo-white-giocode.png"
            alt="Giocode logo"
            width={159}
            height={40}
            priority
          />
        </Link>
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