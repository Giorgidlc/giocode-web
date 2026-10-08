import type { Metadata } from "next";
import LegalPage from "@/components/sections/legal-page/LegalPage";
import styles from "@/components/sections/legal-page/legal-page.module.css";

export const metadata: Metadata = {
  title: "Aviso Legal | Giocode",
  description:
    "Aviso legal de Giocode: datos del titular, condiciones de uso, propiedad intelectual y responsabilidad.",
};

export default function LegalNoticesPage() {
  return (
    <LegalPage title="Aviso Legal" updated="[fecha]">
      <section className={styles.section}>
        <h2 className={styles.h2}>1. Datos del titular</h2>
        <p className={styles.p}>
          En cumplimiento de la obligación de información, el titular de este sitio web es{" "}
          <span className={styles.strong}>Giocode</span>, con NIF{" "}
          <span className={styles.strong}>ES61745670P</span>, domicilio en{" "}
          <span className={styles.strong}>C/ José María Codón 49, 09007 Burgos, España</span> y correo electrónico{" "}
          <span className={styles.strong}>gio@giocode.dev</span>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>2. Condiciones de uso</h2>
        <p className={styles.p}>
          El acceso y navegación por este sitio web atribuye la condición de usuario e
          implica la aceptación plena de las presentes condiciones. El contenido tiene una
          finalidad informativa y de presentación de servicios.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>3. Propiedad intelectual e industrial</h2>
        <p className={styles.p}>
          Todos los contenidos del sitio (textos, gráficos, logotipos, imágenes, código y
          diseño) son titularidad de Giocode o de terceros que han autorizado su uso, y
          están protegidos por los derechos de propiedad intelectual e industrial. Queda
          prohibida su reproducción, distribución o comunicación pública sin autorización
          expresa.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>4. Responsabilidad</h2>
        <p className={styles.p}>
          Giocode no se hace responsable de los daños que pudieran derivarse de la
          utilización de los contenidos ni de la disponibilidad continua del servicio.
          Podemos modificar los contenidos sin previo aviso.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>5. Legislación aplicable</h2>
        <p className={styles.p}>
          Estas condiciones se rigen por la legislación española. Para cualquier conflicto,
          las partes se someten a los juzgados y tribunales de [ciudad], sin perjuicio de
          lo establecido en la normativa de consumo.
        </p>
      </section>
    </LegalPage>
  );
}
