import ServiceCard from "@/components/ui/service-card/ServiceCard";
import styles from "./services.module.css";

export default function Services() { 
  return (
    <section className={styles.service}>
      <h2>Todo gira en torno a los <span>sitios web</span></h2>
      <p>No prometemos la luna, y no lo hacemos todo. Pero hacemos lo que hacemos muy bien.</p>
      <div
        className={styles.servicesWrapper}
        role="region"
        aria-label="Servicios"
        tabIndex={0}  
      >
        <ServiceCard
          tag="Desarrollo web"
          title="Desarrollo de sitios web a medida"
          description="Si usted está buscando un sitio estático, uno de WordPress, o un headless (Astro/React) CMS, tenemos la solución adecuada para su cliente."
        />
        <ServiceCard
          tag="Diseño"
          title="Diseño web"
          description="Creamos interfaces modernas y atractivas."
        />
        <ServiceCard
          tag="Diseño"
          title="Diseño web"
          description="Creamos interfaces modernas y atractivas."
        />
        <ServiceCard
          tag="Diseño"
          title="Diseño web"
          description="Creamos interfaces modernas y atractivas."
        />
      
      </div>

    </section>
  )
}