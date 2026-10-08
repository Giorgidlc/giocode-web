"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import styles from "./cookie-consent.module.css";

const STORAGE_KEY = "giocode-consent";
type Consent = "accepted" | "rejected" | null;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Consent {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

function getServerSnapshot(): Consent {
  return null;
}

export default function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [local, setLocal] = useState<Consent>(null);
  const consent = local ?? stored;

  const decide = useCallback((value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value);
    setLocal(value);
  }, []);

  return (
    <>
      {consent === "accepted" && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      {consent === null && (
        <div className={styles.banner} role="dialog" aria-label="Consentimiento de analytics">
          <div className={styles.bannerContent}>
            <p className={styles.bannerText}>
              Usamos analytics de Vercel para entender cómo se usa el sitio. No usamos
              cookies de seguimiento. Solo se activan si aceptas.
            </p>
            <div className={styles.bannerActions}>
              <Link className={styles.policyLink} href="/privacidad">
                Política de privacidad
              </Link>
              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles.rejectBtn}
                  onClick={() => decide("rejected")}
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  className={styles.acceptBtn}
                  onClick={() => decide("accepted")}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
