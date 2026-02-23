import styles from "./page.module.css";
import HeaderNav from "@/components/sections/header-nav/HeaderNav";
import HeroSection from "@/components/sections/hero-section/HeroSection";
import ValueProposition from "@/components/sections/value-proposition-section/ValueProposition";
import Services from "@/components/sections/services-section/Services";
import Mision from "@/components/sections/mision-section/Mision";
import Benefits from "@/components/sections/benefits-section/Benefits";
import Vision from "@/components/sections/vision-section/Vision";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeaderNav />
        <HeroSection />
        <Services />
        <ValueProposition />
        <Mision />
        <Benefits /> 
        <Vision />
      </main>
   
    
    </div>
  );
}
