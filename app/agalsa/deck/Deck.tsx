'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Cover, MensualContent, PresupuestoContent, SLIDES } from './slides'
import styles from './deck.module.css'

export default function Deck() {
  const [index, setIndex] = useState(0)
  const [fixN, setFixN] = useState(2)
  const [redesignM, setRedesignM] = useState(2)
  const total = SLIDES.length
  const slide = SLIDES[index]

  const go = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(total - 1, i))),
    [total],
  )
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const progress = ((index + 1) / total) * 100

  const handleLogout = async () => {
    await fetch('/api/agalsa/logout', { method: 'POST' })
    window.location.href = '/agalsa/login'
  }

  return (
    <div className={styles.frame}>
      <header className={styles.topbar}>
        <span className={styles.sectionTag}>{slide.sectionLabel}</span>
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.counter}>
          {index + 1}/{total}
        </span>
        <div className={styles.topActions}>
          <Link className={styles.backLink} href="/" title="Volver a Giocode" aria-label="Volver a Giocode">
            <Image
              src="/imagotipo-white-giocode.png"
              alt="Giocode"
              width={100}
              height={25}
              priority
              style={{ display: 'block' }}
            />
          </Link>
          <button type="button" className={styles.linkBtn} onClick={handleLogout}>
            Salir
          </button>
        </div>
      </header>

      <main className={styles.viewport}>
        <article key={slide.id} className={styles.slide}>
          {index === 0 ? (
            <Cover onJump={go} />
          ) : slide.id === 'presupuesto' ? (
            <PresupuestoContent fixN={fixN} redesignM={redesignM} onFix={setFixN} onRedesign={setRedesignM} />
          ) : slide.id === 'mensual' ? (
            <MensualContent />
          ) : (
            slide.content
          )}
        </article>
      </main>

      <footer className={styles.controls}>
        <button type="button" className={styles.navBtn} onClick={prev} disabled={index === 0}>
          ← Anterior
        </button>
        <button type="button" className={styles.navBtn} onClick={() => go(0)} disabled={index === 0}>
          Índice
        </button>
        <button
          type="button"
          className={styles.navBtn}
          onClick={next}
          disabled={index === total - 1}
        >
          Siguiente →
        </button>
      </footer>
    </div>
  )
}
