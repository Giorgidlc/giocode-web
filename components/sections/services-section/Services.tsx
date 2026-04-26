"use client";

import { useCallback, useRef, useState } from "react";
import ServiceCard from "@/components/ui/service-card/ServiceCard";
import styles from "./services.module.css";

export default function Services() {
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const element = servicesRef.current;
    if (!element) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = event.clientX;
    scrollLeftRef.current = element.scrollLeft;
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !servicesRef.current) return;

    const deltaX = event.clientX - startXRef.current;
    servicesRef.current.scrollLeft = scrollLeftRef.current - deltaX;
  }, []);

  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const element = servicesRef.current;
    if (!element) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = event.clientX;
    scrollLeftRef.current = element.scrollLeft;
  }, []);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !servicesRef.current) return;

    const deltaX = event.clientX - startXRef.current;
    servicesRef.current.scrollLeft = scrollLeftRef.current - deltaX;
  }, []);

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    if ('pointerId' in event) {
      servicesRef.current?.releasePointerCapture(event.pointerId);
    }
  }, []);

  return (
    <section className={styles.service}>
      <h2>Todo gira en torno a los <span>sitios web</span></h2>
      <p>No prometo la luna, y no hago de todo. Pero lo que hago lo hago muy bien.</p>
      <div
        ref={servicesRef}
        className={`${styles.servicesWrapper} ${isDragging ? styles.dragging : ""}`}
        role="region"
        aria-label="Servicios"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
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
  );
}