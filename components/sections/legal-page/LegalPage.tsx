import type { ReactNode } from "react";
import HeaderNav from "@/components/sections/header-nav/HeaderNav";
import Footer from "@/components/sections/footer/Footer";
import styles from "./legal-page.module.css";

interface LegalPageProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeaderNav />
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {/* {updated && <p className={styles.updated}>Última actualización: {updated}</p>} */}
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
