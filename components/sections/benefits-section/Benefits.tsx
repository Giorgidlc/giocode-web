import BenefitCard from "@/components/ui/benefit-card/BenefitCard";
import styles from "./benefits.module.css";
import bgCard from "@/components/ui/card/card.module.css";

export default function Benefits() {
  return (
    <section className={styles.benefits}>
      <h2>
        Juntos conseguiremos lo <span>increíble</span>
      </h2>

      <fieldset
        className={`${styles.benefitsWrapper} ${styles.yourHand}`}
        role="region"
        aria-label="Beneficios"
        tabIndex={0}
      >
        <legend>Beneficios</legend>

        <label className={styles.benefitCard}>
          <BenefitCard
            classBackground={bgCard.themeOrange}
            title="Proceso optimizado"
            description="Nuestro proceso interno está optimizado para la eficiencia y la eficacia. Nos gusta ser directos. El equipo puede ver el cronograma del proyecto a través del panel de control y colaborar en línea. ¡Sin tickets, lo prometemos!"
          />
          <input type="radio" name="the-looper" value="card01" />
        </label>

        <label className={styles.benefitCard}>
          <BenefitCard
            classBackground={bgCard.themeLight}
            title="Enfoque orientado al diseñador"
            description="Creemos en un entorno de trabajo totalmente remoto, positivo, inspirador y gratificante que fomente el crecimiento, la creatividad y la innovación."
          />
          <input type="radio" name="the-looper" value="card02" />
        </label>

        <label className={styles.benefitCard}>
          <BenefitCard
            classBackground={bgCard.themePink}
            title="Desarrollo web de alta calidad"
            description="Crear experiencias digitales excepcionales requiere pasión, atención al detalle y dedicación al más alto nivel. Nos importa nuestro trabajo y siempre nos esforzamos por ofrecer los mejores resultados."
          />
          <input type="radio" name="the-looper" value="card03" />
        </label>

        <label className={styles.benefitCard}>
          <BenefitCard
            classBackground={bgCard.themeBrown}
            title="Desarrollo de sitios web a medida"
            description="Si usted está buscando un sitio estático, uno de WordPress, o un headless (Astro/React) CMS, tenemos la solución adecuada para su cliente."
          />
          <input type="radio" name="the-looper" value="card04" />
        </label>
      </fieldset>
    </section>
  );
}
