"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ServiceCard from "@/components/ui/service-card/ServiceCard";
import styles from "./services.module.css";

export default function Services() {
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const element = servicesRef.current;
    if (!element) return;

    setCanScrollLeft(element.scrollLeft > 1);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1
    );
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const element = servicesRef.current;
      if (!element) return;

      const card = element.querySelector(".card") as HTMLElement | null;
      const scrollAmount = card
        ? card.offsetWidth + parseInt(getComputedStyle(element).gap || "16")
        : element.clientWidth * 0.85;

      element.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    },
    []
  );

  useEffect(() => {
    const element = servicesRef.current;
    if (!element) return;

    updateScrollButtons();
    element.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      element.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInside =
        activeElement === servicesRef.current ||
        servicesRef.current?.contains(activeElement || null);

      if (!isInside) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scroll("left");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scroll("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scroll]);

  return (
    <section className={styles.service}>
      <h2>
        Todo gira en torno a los <span>sitios web</span>
      </h2>
      <p>
        No prometo la luna, y no hago de todo. Pero lo que hago lo hago muy bien.
      </p>

      <div
        ref={servicesRef}
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
<div className={styles.controls}>
        <button
          className={styles.arrowButton}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Anterior servicio"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className={styles.arrowButton}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Siguiente servicio"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}