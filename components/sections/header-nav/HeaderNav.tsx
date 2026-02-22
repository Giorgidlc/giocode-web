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
    </nav>
  )
}