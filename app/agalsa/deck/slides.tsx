import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import styles from './deck.module.css'
import { getEvidence, getIssues } from './evidence'

export interface DeckSlide {
  id: string
  section: string
  sectionLabel: string
  title: string
  content: ReactNode
}

function Status({ kind }: { kind: 'red' | 'yellow' | 'grey' | 'green' }) {
  const cls =
    kind === 'red'
      ? styles.stRed
      : kind === 'yellow'
        ? styles.stYellow
        : kind === 'green'
          ? styles.stGreen
          : styles.stGrey
  return <span className={`${styles.status} ${cls}`} aria-hidden="true" />
}

const SECTIONS: Array<{ n: string; title: string; desc: string; slideIndex: number }> = [
  { n: '1.', title: 'Alcance', desc: 'Qué se auditó y con qué criterios.', slideIndex: 1 },
  { n: '2.', title: 'Hallazgos', desc: 'Evidencias principales encontradas.', slideIndex: 2 },
  { n: '3.', title: 'Riesgos', desc: 'Impacto operativo, comercial y técnico.', slideIndex: 5 },
  { n: '4.', title: 'Recomendaciones', desc: 'Acciones priorizadas por impacto / esfuerzo.', slideIndex: 6 },
  { n: '5.', title: 'Presupuesto', desc: 'Calcula el coste según el nº de webs.', slideIndex: 7 },
  { n: '6.', title: 'Plan', desc: 'Siguientes pasos y propuesta Giocode.', slideIndex: 9 },
]

export function Cover({ onJump }: { onJump: (i: number) => void }) {
  return (
    <>
      <p className={styles.kicker}>Giocode · Auditoría</p>
      <h1 className={styles.heroTitle}>AGALSA</h1>
      <p className={styles.subtitle}>Resumen de la auditoría: 12 webs propias, 5 proveedores, 5 gestores externos. Revisamos cada sitio con criterios de SSL, seguridad, rendimiento e indexación.</p>
      <div className={styles.coverGrid}>
        {SECTIONS.map((s) => (
          <button
            key={s.title}
            type="button"
            onClick={() => onJump(s.slideIndex)}
            className={`${styles.card} ${styles.themeLight} ${styles.coverBtn}`}
          >
            <span className={styles.coverNum}>{s.n}</span>
            <h3 className={styles.titleCard}>{s.title}</h3>
            <p className={styles.dim}>{s.desc}</p>
          </button>
        ))}
      </div>
      <p className={styles.meta}>
        Cliente AGALSA Sierra de la Demanda · Giocode · 13/09/2026 
      </p>
    </>
  )
}

const AUDITED_WEBS = [
  'agalsa.es',
  'sierradelademanda.com',
  'demandavivienda.es',
  'demandavivienda.com',
  'vivelademanda.com',
  'santander-mediterraneo.com',
  'demandacoworkingrural.org',
  'elvalledigital.es',
  'ferrocarrilminero.com/.es',
  'viaverdesierradelademanda.com',
  'sierradelademanda.es',
  'agalsa.eu/.org',
]

type SemStatus = 'red' | 'yellow' | 'grey'

const SEMAPHORE_ROWS: Array<{
  web: string
  hosting: string
  tech: string
  status: SemStatus
  statusLabel: string
  note: string
}> = [
  { web: 'agalsa.es', hosting: 'Siteground', tech: 'WP + Thrive', status: 'yellow', statusLabel: 'Amarillo', note: 'Funciona, constructor pesado' },
  { web: 'sierradelademanda.com', hosting: 'O2Studio', tech: 'WP, 22GB', status: 'red', statusLabel: 'Rojo', note: 'Sin actualizar, disco al límite' },
  { web: 'demandavivienda.es', hosting: 'Siteground', tech: 'WP + WPBakery', status: 'red', statusLabel: 'Rojo', note: 'Feria 2024, ¿se mantiene?' },
  { web: 'demandavivienda.com', hosting: 'Wix (cuenta ajena)', tech: 'Wix SaaS', status: 'red', statusLabel: 'Rojo', note: 'Sin llaves, sin acceso' },
  { web: 'vivelademanda.com', hosting: 'Findspo SaaS', tech: 'SaaS', status: 'grey', statusLabel: 'Gris', note: '1 persona dependiente' },
  { web: 'santander-mediterraneo.com', hosting: 'O2Studio', tech: 'WP', status: 'yellow', statusLabel: 'Amarillo', note: 'Funciona, desactualizada' },
  { web: 'sierradelademanda.es', hosting: 'O2Studio', tech: 'WP “en construcción”', status: 'grey', statusLabel: 'Gris', note: 'Zombi desde 2019' },
  { web: 'agalsa.sierradelademanda.es', hosting: 'O2Studio', tech: 'Subdominio', status: 'grey', statusLabel: 'Gris', note: 'Mantenimiento desde 2019' },
  { web: 'agalsa.eu / .org', hosting: 'O2Studio', tech: 'Redirección', status: 'grey', statusLabel: 'Gris', note: 'Solo redirigen, se pagan' },
  { web: 'sierradelademanda.org', hosting: 'O2Studio', tech: 'Redirección', status: 'grey', statusLabel: 'Gris', note: 'Solo redirige, se paga' },
  { web: 'santander-mediterraneo.es', hosting: 'O2Studio', tech: 'Redirección', status: 'grey', statusLabel: 'Gris', note: 'Solo redirige, se paga' },
  { web: 'ferrocarrilminero.com/.es', hosting: 'O2Studio', tech: 'Sin WP', status: 'red', statusLabel: 'Rojo', note: 'Contradictorio, verificar' },
  { web: 'demandacoworkingrural.org', hosting: 'Arsys', tech: 'WP', status: 'yellow', statusLabel: 'Amarillo', note: '1 persona dependiente' },
  { web: 'viaverdesierradelademanda.com', hosting: '?', tech: '?', status: 'yellow', statusLabel: 'Amarillo', note: 'Propiedad ¿?' },
  { web: 'elvalledigital.es', hosting: '?', tech: '?', status: 'red', statusLabel: 'Rojo', note: 'SSL roto, enlace desde principal' },
  { web: 'Cooperación x5', hosting: 'Terceros', tech: '—', status: 'grey', statusLabel: 'Gris', note: 'No se migran' },
]

type SemSortKey = 'hosting' | 'tech' | 'status'

function SemaphoreTable() {
  const [sortKey, setSortKey] = useState<SemSortKey | null>(null)
  const [sortDir, setSortDir] = useState<1 | -1>(1)

  const rows = useMemo(() => {
    if (!sortKey) return SEMAPHORE_ROWS
    const statusOrder: Record<SemStatus, number> = { red: 0, yellow: 1, grey: 2 }
    return [...SEMAPHORE_ROWS].sort((a, b) => {
      const av = sortKey === 'status' ? statusOrder[a.status] : a[sortKey].toLowerCase()
      const bv = sortKey === 'status' ? statusOrder[b.status] : b[sortKey].toLowerCase()
      if (av < bv) return -1 * sortDir
      if (av > bv) return 1 * sortDir
      return 0
    })
  }, [sortKey, sortDir])

  const toggle = (key: SemSortKey) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir(1)
    } else {
      setSortDir((d) => (d === 1 ? -1 : 1))
    }
  }

  const arrow = (key: SemSortKey) => (sortKey === key ? (sortDir === 1 ? ' ▲' : ' ▼') : '')

  return (
    <div className={styles.tableWrapScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Web</th>
            <th>
              <button type="button" onClick={() => toggle('hosting')} className={styles.thSort} title="Ordenar por hosting">
                Hosting{arrow('hosting')}
              </button>
            </th>
            <th>
              <button type="button" onClick={() => toggle('tech')} className={styles.thSort} title="Ordenar por tecnología">
                Tecnología{arrow('tech')}
              </button>
            </th>
            <th>
              <button type="button" onClick={() => toggle('status')} className={styles.thSort} title="Ordenar por estado">
                Estado{arrow('status')}
              </button>
            </th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.web}>
              <td>{r.web}</td>
              <td>{r.hosting}</td>
              <td>{r.tech}</td>
              <td>
                <Status kind={r.status} />
                {r.statusLabel}
              </td>
              <td>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function fmtMs(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`
}

const EVIDENCE_TECH_ROWS: Array<{
  web: string
  php: string
  wp: string
  disco: string
  notas: string
  colspan?: boolean
}> = [
  { web: 'sierradelademanda.com', php: '7.1.33 EOL', wp: 'WP + WPBakery', disco: '22.3 GB', notas: 'Candidata rehacer' },
  { web: 'agalsa.es', php: '7.1', wp: 'WP + Thrive', disco: '267 MB', notas: 'Constructor pesado' },
  { web: 'demandavivienda.es', php: '7.1', wp: 'WP + WPBakery', disco: '20 MB', notas: 'Restaurada en junio' },
  { web: 'elvalledigital.es', php: '?', wp: 'WP + Elementor', disco: '?', notas: 'SSL roto' },
  { web: 'demandavivienda.com', php: 'Wix SaaS', wp: '', disco: '—', notas: 'Cuenta desconocida', colspan: true },
  { web: 'vivelademanda.com', php: 'Findspo SaaS', wp: 'Vue.js + inertiajs', disco: '—', notas: 'Web a medida'},
]

function EvidenceBlock() {
  const [selected, setSelected] = useState<string | null>(null)
  const data = selected ? getEvidence(selected) : null
  const issues = selected ? getIssues(selected) : null

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Web</th>
              <th>PHP</th>
              <th>Constructor</th>
              <th>Disco</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {EVIDENCE_TECH_ROWS.map((r) => {
              const key = r.web.split(' (')[0]
              const hasData = getEvidence(key) !== null || getIssues(key) !== null
              return (
                <tr key={r.web}>
                  <td>
                    {hasData ? (
                      <button
                        type="button"
                        className={styles.webBtn}
                        onClick={() => setSelected(key)}
                        title="Ver datos GTmetrix"
                      >
                        {r.web} ↗
                      </button>
                    ) : (
                      r.web
                    )}
                  </td>
                  {r.colspan ? (
                    <>
                      <td colSpan={2}>{r.php}</td>
                      <td>{r.disco}</td>
                    </>
                  ) : (
                    <>
                      <td>{r.php}</td>
                      <td>{r.wp}</td>
                      <td>{r.disco}</td>
                    </>
                  )}
                  <td>{r.notas}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {selected && (data || issues) && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Evidencia ${selected}`}
        >
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h3>Evidencia · {selected}</h3>
              <button type="button" className={styles.modalClose} onClick={() => setSelected(null)} title="Cerrar">
                X
              </button>
            </div>
            {data && (
              <>
                <h3 className={styles.titleCard}>GTmetrix · Rendimiento</h3>
                <div className={styles.metricGrid}>
                  <div className={styles.metricBox}>
                    <span>Carga completa</span>
                    <strong>{fmtMs(data.timings.fullyLoadedMs)}</strong>
                  </div>
                  <div className={styles.metricBox}>
                    <span>Interactiva (TTI)</span>
                    <strong>{fmtMs(data.timings.ttiMs)}</strong>
                  </div>
                  <div className={styles.metricBox}>
                    <span>LCP</span>
                    <strong>{fmtMs(data.timings.lcpMs)}</strong>
                  </div>
                  <div className={styles.metricBox}>
                    <span>First paint</span>
                    <strong>{fmtMs(data.timings.firstPaintMs)}</strong>
                  </div>
                  <div className={styles.metricBox}>
                    <span>Peticiones</span>
                    <strong>{data.technical.totalRequests}</strong>
                  </div>
                  <div className={styles.metricBox}>
                    <span>Transferido</span>
                    <strong>{data.technical.transferMB} MB</strong>
                  </div>
                  <div className={styles.metricBox}>
                    <span>PHP</span>
                    <strong>{data.technical.php}</strong>
                  </div>
                  <div className={styles.metricBox}>
                    <span>Errores</span>
                    <strong>
                      {data.technical.statusError} / {data.technical.totalRequests}
                    </strong>
                  </div>
                </div>
                <p className={styles.meta}>Servidor {data.technical.server} · {data.technical.status200}× OK</p>
              </>
            )}
            {issues && (
              <>
                <h3 className={styles.titleCard}>
                  Screaming Frog · {issues.total} issues ({issues.alta.length} alta / {issues.media.length} media /{' '}
                  {issues.bajaCount} baja)
                </h3>
                {issues.alta.length > 0 && (
                  <details className={styles.details}>
                    <summary>Prioridad alta ({issues.alta.length})</summary>
                    <ul>
                      {issues.alta.map((it) => (
                        <li key={it.name}>
                          {it.name}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                {issues.media.length > 0 && (
                  <details className={styles.details}>
                    <summary>Prioridad media ({issues.media.length})</summary>
                    <ul>
                      {issues.media.map((it) => (
                        <li key={it.name}>
                          {it.name}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                {issues.bajaTop.length > 0 && (
                  <details className={styles.details}>
                    <summary>Prioridad baja: top {issues.bajaTop.length} de {issues.bajaCount}</summary>
                    <ul>
                      {issues.bajaTop.map((it) => (
                        <li key={it.name}>
                          {it.name}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

/* Calculadora de presupuesto (solo slide presupuesto, sin horas ni tarifas visibles) */
const INFRA_PRICE = 360
const MIGRATION_PER_WEB = 360
const FIX_PER_WEB = 1350
const REDESIGN_PER_WEB = 2250
const REDESIGN_PER_WEB_DISCOUNTED = 2025

function fmtEUR(n: number): string {
  return `${new Intl.NumberFormat('es-ES').format(n)} €`
}

function redesignCost(m: number): number {
  return Math.min(m, 2) * REDESIGN_PER_WEB + Math.max(0, m - 2) * REDESIGN_PER_WEB_DISCOUNTED
}

export const MONTHLY_PRICE = 90

export interface BudgetSelection {
  fixN: number
  redesignM: number
}

export function calcBudget(fixN: number, redesignM: number) {
  const migrationTotal = fixN * MIGRATION_PER_WEB
  const fixTotal = fixN * FIX_PER_WEB
  const redesignTotal = redesignCost(redesignM)
  const discountTotal = redesignM > 2 ? (redesignM - 2) * (REDESIGN_PER_WEB - REDESIGN_PER_WEB_DISCOUNTED) : 0
  const optionA = INFRA_PRICE + migrationTotal + fixTotal
  const optionB = INFRA_PRICE + redesignTotal
  const yearly = MONTHLY_PRICE * 12
  return {
    migrationTotal,
    fixTotal,
    redesignTotal,
    discountTotal,
    optionA,
    optionB,
    yearA: optionA + yearly,
    yearB: optionB + yearly,
  }
}

function BudgetCalculator({
  fixN,
  redesignM,
  onFix,
  onRedesign,
}: BudgetSelection & { onFix: (n: number) => void; onRedesign: (n: number) => void }) {
  const handleFix = (raw: number) => {
    onFix(Math.max(1, Math.floor(raw) || 1))
  }

  const handleRedesign = (raw: number) => {
    onRedesign(Math.max(0, Math.floor(raw) || 0))
  }

  const { migrationTotal, fixTotal, redesignTotal, discountTotal, optionA, optionB, yearA, yearB } = calcBudget(fixN, redesignM)

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Infraestructura (pago único)</td><td>{fmtEUR(INFRA_PRICE)}</td></tr>
            <tr><td>Migración, por web</td><td>{fmtEUR(MIGRATION_PER_WEB)}</td></tr>
            <tr><td>Arreglo y puesta a punto, por web</td><td>{fmtEUR(FIX_PER_WEB)}</td></tr>
            <tr><td>Rediseño completo, por web</td><td>{fmtEUR(REDESIGN_PER_WEB)} (desde la 3ª: {fmtEUR(REDESIGN_PER_WEB_DISCOUNTED)})</td></tr>
          </tbody>
        </table>
      </div>
      <p className={styles.meta}>El rediseño es integral: incluye el despliegue y no paga migración ni arreglo. La infraestructura se paga una sola vez, elijas el camino que elijas.</p>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="webs-fix">Webs a arreglar</label>
          <input
            id="webs-fix"
            className={styles.input}
            type="number"
            min={1}
            value={fixN}
            onChange={(e) => handleFix(e.target.valueAsNumber)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="webs-redesign">Webs a rediseñar</label>
          <input
            id="webs-redesign"
            className={styles.input}
            type="number"
            min={0}
            value={redesignM}
            onChange={(e) => handleRedesign(e.target.valueAsNumber)}
          />
        </div>
      </div>
      <div className={styles.grid2}>
        <div className={`${styles.card} ${styles.themePink}`}>
          <span className={styles.riskIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <h3>Opción A · Arreglar y asegurar</h3>
          <div className={styles.quote}><strong>{fmtEUR(optionA)}</strong> · pago único</div>
          <ul>
            <li>Mantenimiento: {fmtEUR(MONTHLY_PRICE)}/mes (igual en ambas opciones)</li>
            <li><strong>Total año 1:</strong> {fmtEUR(yearA)}</li>
          </ul>
          <p className={styles.dim}>Migración + arreglo para {fixN} {fixN === 1 ? 'web' : 'webs'}. Mantiene el diseño actual.</p>
        </div>
        <div className={`${styles.card} ${styles.themeOrange}`}>
          <span className={styles.riskIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
              <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.38 15.879a1 1 0 0 0 .776.746L13 18" />
              <path d="m2.3 2.3 7.286 7.286" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </span>
          <h3>Opción B · Rediseño integral</h3>
          <div className={styles.quote}><strong>{fmtEUR(optionB)}</strong> · pago único</div>
          <ul>
            <li>Mantenimiento: {fmtEUR(MONTHLY_PRICE)}/mes (igual en ambas opciones)</li>
            <li><strong>Total año 1:</strong> {fmtEUR(yearB)}</li>
          </ul>
          {redesignM > 0 ? (
            <p className={styles.dim}>Infraestructura + rediseño de {redesignM} {redesignM === 1 ? 'web' : 'webs'}. Sin migración ni arreglo: se rehace.</p>
          ) : (
            <p className={styles.dim}>Sin rediseños seleccionados: solo infraestructura.</p>
          )}
        </div>
      </div>
      <details className={styles.details}>
        <summary>Ver desglose del cálculo</summary>
        <div className={`${styles.card} ${styles.themeLight}`}>
          <ul>
            <li><strong>Infraestructura (única, incluida en ambas opciones):</strong><br />{fmtEUR(INFRA_PRICE)}</li>
            <li><strong>Mantenimiento (igual en ambas opciones):</strong><br />{fmtEUR(MONTHLY_PRICE)}/mes</li>
          </ul>
          <h3 className={styles.titleCard}>Opción A · {fixN} {fixN === 1 ? 'web a arreglar' : 'webs a arreglar'}</h3>
          <ul>
            <li><strong>Migración:</strong><br />{fmtEUR(migrationTotal)}</li>
            <li><strong>Arreglo y puesta a punto:</strong><br />{fmtEUR(fixTotal)}</li>
            <li><strong>Total opción A:</strong><br />{fmtEUR(optionA)}</li>
          </ul>
          {redesignM > 0 && (
            <>
              <h3 className={styles.titleCard}>Opción B · {redesignM} {redesignM === 1 ? 'web a rediseñar' : 'webs a rediseñar'}</h3>
              <ul>
                <li><strong>Rediseño integral (incluye despliegue):</strong><br />{fmtEUR(redesignTotal)}</li>
                {discountTotal > 0 && (
                  <li><strong>Descuento volumen (10% desde la 3ª):</strong><br />−{fmtEUR(discountTotal)}</li>
                )}
                <li><strong>Total opción B:</strong><br />{fmtEUR(optionB)}</li>
              </ul>
            </>
          )}
        </div>
      </details>
      <p className={styles.meta}>Precios netos (sin IVA). Mantenimiento mensual con monitoreo 24h y backups — ver desglose en el siguiente slide.</p>
    </>
  )
}

export function PresupuestoContent({
  fixN,
  redesignM,
  onFix,
  onRedesign,
}: BudgetSelection & { onFix: (n: number) => void; onRedesign: (n: number) => void }) {
  return (
    <>
      <p className={styles.kicker}>5 · Presupuesto</p>
      <h2 className={styles.title}>Presupuesto</h2>
      <p className={styles.subtitle}>Estrategia en dos fases. Elige cuántas webs arreglar y cuántas rediseñar: los totales se calculan al momento.</p>
      <BudgetCalculator fixN={fixN} redesignM={redesignM} onFix={onFix} onRedesign={onRedesign} />
    </>
  )
}

export function MensualContent() {
  return (
    <>
      <p className={styles.kicker}>5 · Presupuesto</p>
      <h2 className={styles.title}>Mantenimiento mensual · {fmtEUR(MONTHLY_PRICE)}</h2>
      <p className={styles.subtitle}>Servidor, seguridad y soporte en una sola cuota. Se suma al pago único elegido en el slide anterior.</p>
      <div className={styles.grid2}>
        <div className={`${styles.card} ${styles.themeBrown}`}>
          <h3>Incluye</h3>
          <ul>
            <li>Servidor europeo gestionado (incluido)</li>
            <li>SSL automático</li>
            <li>Backups diarios externos automáticos</li>
            <li>Monitoreo 24h con aviso automático</li>
          </ul>
        </div>
        <div className={`${styles.card} ${styles.themeLight}`}>
          <h3>No incluye</h3>
          <ul>
            <li>Crear páginas nuevas</li>
            <li>Rediseño / cambio de tema</li>
            <li>Redactar noticias</li>
            <li>Redes sociales</li>
            <li>Campañas SEO / Ads</li>
            <li>E-commerce, video, foto</li>
            <li>Arreglo de webs rotas (aparte)</li>
            <li>Actualizaciones manuales (aparte)</li>
            <li>Informe mensual (aparte)</li>
            <li>Pequeños cambios de contenido (aparte)</li>
            <li>Intervención ante alertas (aparte)</li>
          </ul>
        </div>
      </div>
      <p className={styles.meta}>Dominios aparte (~20 €/año c/u). Servidor y copias incluidos en la cuota.</p>
    </>
  )
}

export const SLIDES: DeckSlide[] = [
  {
    id: 'portada',
    section: 'Portada',
    sectionLabel: 'Índice',
    title: 'AGALSA',
    content: null,
  },
  {
    id: 'alcance',
    section: 'Alcance',
    sectionLabel: '1 · Alcance',
    title: 'Qué se auditó y con qué criterios',
    content: (
      <>
        <p className={styles.kicker}>1 · Alcance</p>
        <h2 className={styles.title}>Qué se auditó y con qué criterios</h2>
        <p className={styles.subtitle}>12 webs propias en 5 sitios distintos, más 5 de socios que vigilamos.</p>
        <div className={styles.badges}>
          {['SSL', 'Actualizaciones', 'Seguridad', 'Rendimiento', 'Indexación', 'Control y accesos'].map((c) => (
            <span key={c} className={styles.badge}>
              {c}
            </span>
          ))}
        </div>
        <div className={styles.metrics2col}>
          <div className={styles.metricCard}>
            <span className={styles.metricNum}>12</span>
            <span className={styles.metricLabel}>Webs propias</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricNum}>5</span>
            <span className={styles.metricLabel}>Proveedores (Siteground, O2Studio, Arsys, Findspo, Wix)</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricNum}>5</span>
            <span className={styles.metricLabel}>Gestores externos (Ángel, Trébede, Teseo, César, Débora)</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricNum}>5</span>
            <span className={styles.metricLabel}>Cooperación (no se migran, se monitorizan)</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricNum}>1</span>
            <span className={styles.metricLabel}>Cuenta Wix sin control (demandavivienda.com)</span>
          </div>
        </div>
        <h3 className={styles.titleCard}>Webs auditadas</h3>
        <ul className={styles.webList}>
          {AUDITED_WEBS.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'semaforo',
    section: 'Hallazgos',
    sectionLabel: '2 · Hallazgos',
    title: 'Semáforo',
    content: (
      <>
        <p className={styles.kicker}>2 · Hallazgos</p>
        <h2 className={styles.title}>Semáforo</h2>
        <p className={styles.subtitle}>Amarillo funciona. Rojo necesita atención. Gris no aporta.</p>
        <SemaphoreTable />
      </>
    ),
  },
  {
    id: 'problemas',
    section: 'Hallazgos',
    sectionLabel: '2 · Hallazgos',
    title: 'Tres problemas',
    content: (
      <>
        <p className={styles.kicker}>2 · Hallazgos</p>
        <h2 className={styles.title}>Tres problemas</h2>
        <p className={styles.subtitle}>Lo que duele en lenguaje de negocio, no técnico.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className={`${styles.card} ${styles.themePink}`}>
            <div className={styles.problemCols}>
              <span className={styles.problemNum}>1</span>
              <h3>Riesgo para las ayudas Leader</h3>
              <div className={styles.problemBody}>
                <p>La web de turismo lleva años sin actualizar, el disco está al límite y el navegador avisa de “sitio no seguro”. Cuando quien financia ve ese aviso, duda. En junio ya hubo que restaurar la web de la feria desde una copia.</p>
                <p className={styles.dim}>Sufren: visitantes y entidad financiadora</p>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles.themeOrange}`}>
            <div className={styles.problemCols}>
              <span className={styles.problemNum}>2</span>
              <h3>Webs que no controláis</h3>
              <div className={styles.problemBody}>
                <p>La web de vivienda —clave para repoblación— vive en una cuenta Wix que nadie localiza. Vive la Demanda no tiene usuarios propios. Entre cinco gestores externos y el equipo, nadie tiene el mapa completo ni datos de visitas.</p>
                <p className={styles.dim}>Sufren: equipo y futuros repobladores</p>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles.themeBrown}`}>
            <div className={styles.problemCols}>
              <span className={styles.problemNum}>3</span>
              <h3>Imagen de asociación parada</h3>
              <div className={styles.problemBody}>
                <p>Enlaces que llevan a páginas vacías, la feria anclada en 2024, Valle Digital con error de seguridad y dos webs en “construcción” desde 2019. Quien entra piensa que la actividad se detuvo.</p>
                <p className={styles.dim}>Sufren: vecinos y socios</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'evidencias',
    section: 'Hallazgos',
    sectionLabel: '2 · Hallazgos',
    title: 'Evidencias',
    content: (
      <>
        <p className={styles.kicker}>2 · Hallazgos</p>
        <h2 className={styles.title}>Evidencias</h2>
        <p className={styles.subtitle}>Datos reales por web: rendimiento medido con GTmetrix y salud técnica con Screaming Frog. Toca una web para ver el detalle.</p>
        <EvidenceBlock />
      </>
    ),
  },
  {
    id: 'riesgos',
    section: 'Riesgos',
    sectionLabel: '3 · Riesgos',
    title: 'Riesgos de no actuar',
    content: (
      <>
        <p className={styles.kicker}>3 · Riesgos</p>
        <h2 className={styles.title}>Riesgos de no actuar</h2>
        <p className={styles.subtitle}>No es un desastre, pero requiere atención ahora que aún funciona.</p>
        <div className={styles.grid2}>
          <div className={`${styles.card} ${styles.themePink}`}>
            <span className={styles.riskIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </span>
            <h3>Comercial</h3>
            <p>Leader ve “no seguro” → duda, posible rechazo subvención.</p>
          </div>
          <div className={`${styles.card} ${styles.themeOrange}`}>
            <span className={styles.riskIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </span>
            <h3>Técnico</h3>
            <p>Turismo cae en verano → sin escaparate, nadie lo sabe.</p>
          </div>
          <div className={`${styles.card} ${styles.themeBrown}`}>
            <span className={styles.riskIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </span>
            <h3>Operativo</h3>
            <p>Vivienda sin llaves → pérdida de web clave repoblación.</p>
          </div>
          <div className={`${styles.card} ${styles.themeLight}`}>
            <span className={styles.riskIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </span>
            <h3>Operativo</h3>
            <p>Equipo disperso → horas perdidas en 5 paneles.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'que-cambia',
    section: 'Recomendaciones',
    sectionLabel: '4 · Recomendaciones',
    title: 'Qué cambia',
    content: (
      <>
        <p className={styles.kicker}>4 · Recomendaciones</p>
        <h2 className={styles.title}>Qué cambia</h2>
        <p className={styles.subtitle}>Delegad la gestión técnica y volcad vuestro esfuerzo en vuestra misión principal.</p>
        <div className={styles.grid2}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>Antes</th>
                  <th>Después</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Proveedores</td><td>5</td><td>1 (Hetzner)</td></tr>
                <tr><td>Personas</td><td>5+</td><td>1 (yo)</td></tr>
                <tr><td>Facturas</td><td>5</td><td>1</td></tr>
                <tr><td>SSL</td><td>Varios rotos</td><td>Automático</td></tr>
                <tr><td>Backups</td><td>Desconocidos</td><td>Diarios, probados</td></tr>
                <tr><td>Monitoreo</td><td>Ninguno</td><td>24h, aviso &lt;5 min</td></tr>
                <tr><td>Correos</td><td>Desconocidos</td><td>Se quedan igual</td></tr>
              </tbody>
            </table>
          </div>
          <div className={`${styles.card} ${styles.themeLight}`}>
            <h3 className={styles.titleCard}>Cómo lo implementaremos:</h3>
            <ul>
              <li><strong>Infraestructura centralizada:</strong><br />Un único proveedor europeo de alto rendimiento que unifica y optimiza los recursos.</li>
              <li><strong>Aislamiento de servicios:</strong><br />Arquitectura modular; si un sitio experimenta un fallo, los demás funcionan sin verse afectados.</li>
              <li><strong>Seguridad automatizada:</strong><br />Gestión automática de certificados SSL para evitar caducidades o errores de acceso.</li>
              <li><strong>Respaldos redundantes:</strong><br />Copias de seguridad diarias almacenadas de forma externa e independiente.</li>
              <li><strong>Monitorización proactiva:</strong><br />Vigilancia continua las 24 horas con alertas tempranas ante cualquier anomalía.</li>
              <li><strong>Continuidad:</strong><br />Los servicios de correo electrónico actuales no se modifican ni sufren interrupciones.</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'presupuesto',
    section: 'Presupuesto',
    sectionLabel: '5 · Presupuesto',
    title: 'Presupuesto',
    content: null,
  },
  {
    id: 'mensual',
    section: 'Presupuesto',
    sectionLabel: '5 · Presupuesto',
    title: 'Mantenimiento mensual · 90 €',
    content: null,
  },
  {
    id: 'plan',
    section: 'Plan',
    sectionLabel: '6 · Plan',
    title: 'Plan de trabajo',
    content: (
      <>
        <p className={styles.kicker}>6 · Plan</p>
        <h2 className={styles.title}>Plan de trabajo</h2>
        <p className={styles.subtitle}>Sin cortes. La vieja sigue activa 48h. Nunca 2 webs el mismo día.</p>
        <h3 className={styles.titleCard}>1 web · 4 semanas</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Semana</th>
                <th>Qué hago yo</th>
                <th>Qué hacéis vosotros</th>
                <th>Hito</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Preparo infraestructura (servidor, SSL, backups, monitoreo)</td><td>Nada, solo aprobáis</td><td>Infra lista</td></tr>
              <tr><td>2-3</td><td>Migro y arreglo la web, la pruebo</td><td>La miráis, me decís</td><td>Web migrada</td></tr>
              <tr><td>4</td><td>Cambio DNS sin cortes, 48h de vigilancia, manual + llaves</td><td>Revisáis manual</td><td>Web entregada</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className={styles.titleCard}>Varias webs · hasta 12 semanas</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Semana</th>
                <th>Qué hago yo</th>
                <th>Qué hacéis vosotros</th>
                <th>Hito</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1-2</td><td>Preparo infraestructura y migro la primera web</td><td>La miráis, me decís</td><td>Base lista</td></tr>
              <tr><td>3-10</td><td>Migro y arreglo el resto, una por una</td><td>Revisáis cada entrega</td><td>Webs migradas</td></tr>
              <tr><td>11-12</td><td>Redirecciones, bajas de lo viejo, manual + llaves</td><td>Revisáis manual</td><td>Todo centralizado</td></tr>
            </tbody>
          </table>
        </div>
        <div className={styles.badges}>
          {['Sin cortes', 'Vieja activa 48h', 'Nunca 2 webs mismo día', 'Rollback <30min', 'Cooperación no se toca'].map(
            (r) => (
              <span key={r} className={styles.badge}>
                {r}
              </span>
            ),
          )}
        </div>
      </>
    ),
  },
  {
    id: 'deberes',
    section: 'Plan',
    sectionLabel: '6 · Plan',
    title: '4 deberes + cierre',
    content: (
      <>
        <p className={styles.kicker}>6 · Plan</p>
        <h2 className={styles.title}>4 deberes + cierre</h2>
        <p className={styles.subtitle}>Dudas por resolver</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Deber</th>
                <th>Para qué</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Quién tiene la cuenta Wix de demandavivienda.com</td><td>Sin esto no se migra vivienda</td></tr>
              <tr><td>2</td><td>Ferrocarril y Viaverde: ¿se mantienen o se dan de baja?</td><td>Evitar pagar por lo que no se usa</td></tr>
              <tr><td>3</td><td>Valle Digital: ¿vuestro o de un tercero?</td><td>Arreglar o quitar enlace</td></tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'gracias',
    section: 'Cierre',
    sectionLabel: 'Cierre',
    title: 'Gracias',
    content: (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.25rem' }}>
        <p className={styles.kicker}>Cierre</p>
        <h2 className={styles.title}>Gracias</h2>
        <p className={styles.subtitle} style={{ textAlign: 'center' }}>No prometo la luna, y no hago de todo. Pero lo que hago lo hago muy bien.</p>
        <img
          src="/imagotipo-white-giocode.png"
          alt="Giocode"
          style={{ maxWidth: '240px', width: '100%', height: 'auto', marginTop: '1rem' }}
        />
        <p className={styles.meta}>13/09/2026</p>
      </div>
    ),
  },
]
