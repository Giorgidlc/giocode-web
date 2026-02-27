import ServiceCard from "@/components/ui/service-card/ServiceCard";
import styles from "./services.module.css";

export default function Services() { 
  return (
    <section className={styles.service}>
      <h2>Todo gira en torno a los <span>sitios web</span></h2>
      <p>No prometo la luna, y no hago de todo. Pero lo que hago lo hago muy bien.</p>
      <div
        className={styles.servicesWrapper}
        role="region"
        aria-label="Servicios"
        tabIndex={0}  
      >
        <ServiceCard
          tag="Diseño Estratégico"
          title="Diseño de Experiencia (UX/UI)"
          description="Construyo recorridos intuitivos que conectan con tu audiencia. Fusiono estética y funcionalidad para que tu marca destaque y convierta cada visita en un resultado real."
        />
        <ServiceCard
          tag="Arquitectura Web"
          title="Desarrollo Web de Alto Impacto"
          description="Sitios rápidos, seguros y escalables. Utilizo arquitecturas modernas para garantizar una navegación y una estructura sólida que evoluciona junto a tus objetivos."
        />
        <ServiceCard
          tag="Infraestructura Dinámica"
          title="Sistemas y Gestión de Contenido"
          description="Implemento soluciones dinámicas con paneles de gestión a medida (CMS) que te permiten actualizar tu información de forma sencilla, rápida y sin depender de terceros."
        />
        <ServiceCard
          tag="Optimización & SEO"
          title="Estrategia y Rendimiento Digital"
          description="Optimizo la velocidad, la seguridad y el SEO para asegurar que tu proyecto sea técnicamente sólido y esté preparado para escalar en su sector."
        />
      
      </div>

    </section>
  )
}