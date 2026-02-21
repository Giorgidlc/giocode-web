import Image from "next/image";
import styles from "./page.module.css";
import MaintenanceCard from "@/components/maintenance/MaintenanceCard";
import ServiceCard from "@/components/ui/service-card/ServiceCard";
import HeaderNav from "@/components/sections/header-nav/HeaderNav";
import HeroSection from "@/components/sections/hero-section/HeroSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeaderNav />
      <main className={styles.main}>
        <HeroSection />
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
      <ServiceCard
        tag= "Desarrollo web"
        title="Desarrollo web"
        description="Creamos sitios web modernos y funcionales que destacan en el mundo digital."
      />
    
    </div>
  );
}
