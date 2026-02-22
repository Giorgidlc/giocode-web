import styles from "./page.module.css";
import HeaderNav from "@/components/sections/header-nav/HeaderNav";
import HeroSection from "@/components/sections/hero-section/HeroSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeaderNav />
      <main className={styles.main}>
        <HeroSection />
   
      </main>
   
    
    </div>
  );
}
