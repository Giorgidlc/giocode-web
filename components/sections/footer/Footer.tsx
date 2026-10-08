import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerImage}>
        <Image
          src="/imagotipo-white-giocode.png"
          alt="Hero Graph"
          width={159}
          height={40}
        />

        </div>
        <nav className={styles.footerLinks}>
          <Link href="/privacidad">Política de Privacidad</Link>
          <Link href="/aviso-legal">Aviso Legal</Link>
        </nav>
        <p>© 2026 Giocode. Todos los derechos reservados.</p>
      </div>
    </section>
  );
}