import type { Metadata } from "next";
import LegalPage from "@/components/sections/legal-page/LegalPage";
import styles from "@/components/sections/legal-page/legal-page.module.css";

export const metadata: Metadata = {
  title: "Política de Privacidad | Giocode",
  description:
    "Información sobre cómo Giocode trata tus datos personales, el uso de analytics y tus derechos según el RGPD.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidad" updated="[fecha]">
      <section className={styles.section}>
        <h2 className={styles.h2}>1. Responsable del tratamiento</h2>
        <p className={styles.p}>
          El responsable de este sitio web es <span className={styles.strong}>Giocode</span>,
          con NIF <span className={styles.strong}>ES61745670P</span> y domicilio en{" "}
          <span className={styles.strong}>C/ José María Codón 49, 09007 Burgos, España</span>. Puedes contactarnos en{" "}
          <span className={styles.strong}>gio@giocode.dev</span>.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>2. Datos que tratamos</h2>
        <p className={styles.p}>
          Este sitio utiliza analytics de Vercel (<span className={styles.strong}>Vercel
          Analytics</span> y <span className={styles.strong}>Vercel Speed Insights</span>).
          Estos servicios recogen, de forma agregada y sin cookies de seguimiento:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Dirección IP (anonimizada).</li>
          <li className={styles.listItem}>Navegador y sistema operativo.</li>
          <li className={styles.listItem}>Página visitada y página de referencia.</li>
          <li className={styles.listItem}>Resolución de pantalla e idioma.</li>
          <li className={styles.listItem}>Métricas de rendimiento (Core Web Vitals).</li>
        </ul>
        <p className={styles.p}>
          No utilizamos cookies de seguimiento, publicidad o perfiles. No tratamos datos
          especiales ni datos de menores.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>3. Finalidad y legitimación</h2>
        <p className={styles.p}>
          Los datos se tratan con la finalidad de entender cómo se utiliza el sitio y
          mejorar su rendimiento y experiencia. La base legal es tu{" "}
          <span className={styles.strong}>consentimiento</span>, que puedes otorgar o
          retirar en cualquier momento a través del aviso de cookies.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>4. Conservación de los datos</h2>
        <p className={styles.p}>
          Los datos se conservan durante el tiempo necesario para cumplir la finalidad
          descrita y, en todo caso, durante el periodo que indique Vercel en su propia
          política de privacidad.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>5. Destinatarios</h2>
        <p className={styles.p}>
          Los datos se ceden a <span className={styles.strong}>Vercel Inc.</span>,
          proveedor de la infraestructura y de los servicios de analytics. Puedes consultar
          su política de privacidad en su sitio web oficial.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>6. Cookies y analytics</h2>
        <p className={styles.p}>
          Este sitio no utiliza cookies de seguimiento. Los servicios de analytics se
          activan únicamente si aceptas el aviso de consentimiento. Si lo rechazas, no se
          recogen datos. Puedes cambiar tu decisión en cualquier momento borrando los
          datos de navegación de tu navegador.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>7. Tus derechos</h2>
        <p className={styles.p}>
          Puedes ejercer los derechos de acceso, rectificación, supresión, oposición,
          limitación y portabilidad, así como el derecho a retirar tu consentimiento,
          escribiendo a <span className={styles.strong}>[email]</span> indicando el derecho
          que deseas ejercer. También puedes presentar una reclamación ante la Agencia
          Española de Protección de Datos (aepd.es).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>8. Contacto</h2>
        <p className={styles.p}>
          Para cualquier cuestión relacionada con la privacidad, escríbenos a{" "}
          <span className={styles.strong}>[email]</span>.
        </p>
      </section>
    </LegalPage>
  );
}
