import BenefitCard from "@/components/ui/benefit-card/BenefitCard";
import styles from "./benefits.module.css";
import bgCard from "@/components/ui/card/card.module.css";
import GraphOptimize from "@/components/ui/icons/GraphOptimize";
import GraphDiamond from "@/components/ui/icons/GraphDiamond";
import GraphEyeStart from "@/components/ui/icons/GraphEyeStart";
import GraphSupport from "@/components/ui/icons/GraphSupport";

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
    
      >
        <legend>Beneficios</legend>

        <label className={styles.benefitCard} tabIndex={0}>
          <BenefitCard
            IconCard={GraphOptimize}
            iconColor="var(--color-brown)"
            classBackground={bgCard.themeOrange}
            title="Proceso optimizado"
            description="Olvida los hilos de correos y los sistemas de tickets lentos. Optimizo cada etapa para que la evolución de tu web sea constante y visible."
          />
          <input type="radio" name="the-looper" value="card01" />
        </label>

        <label className={styles.benefitCard} tabIndex={0}>
          <BenefitCard
            IconCard={GraphDiamond}
            iconColor="var(--color-pink)"
            classBackground={bgCard.themeLight}
            title="Colaboración real"
            description="Trabajo contigo, no para ti. Tomo decisiones a tu lado y mantengo un ritmo que respeta tus tiempos y prioridades."
          />
          <input type="radio" name="the-looper" value="card02" />
        </label>

        <label className={styles.benefitCard} tabIndex={0}>
          <BenefitCard
            IconCard={GraphEyeStart}
            iconColor="var(--color-dark)"
            classBackground={bgCard.themePink}
            title="Desarrollo web de alta calidad"
            description="Creo experiencias digitales que requiere pasión, atención y dedicación al más alto nivel. Me importa mi trabajo y siempre me esfuerzo por ofrecerte los mejores resultados."
          />
          <input type="radio" name="the-looper" value="card03" />
        </label>

        <label className={styles.benefitCard} tabIndex={0}>
          <BenefitCard
            IconCard={GraphSupport}
            iconColor="var(--color-pink)"
            classBackground={bgCard.themeBrown}
            title="Soporte técnico sólido"
            description="Permíteme gestionar el mantenimiento posterior del sitio web y responder a cualquier pregunta técnica que tus clientes puedan tener."
          />
          <input type="radio" name="the-looper" value="card04" />
        </label>
      </fieldset>
    </section>
  );
}
