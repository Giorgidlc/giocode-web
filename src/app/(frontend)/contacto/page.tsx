"use client"

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { es } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import HeaderNav from '@/components/sections/header-nav/HeaderNav'
import Footer from '@/components/sections/footer/Footer'
import styles from './page.module.css'

interface Service {
  id: string
  titulo: string
  value: string
  descripcion: string
  precio: number
  activo: boolean
  icono?: string
}

const MADRID = 'Europe/Madrid'
const SLOT_INICIO = 9 * 60
const SLOT_FIN = 17 * 60 + 30

const HORAS: string[] = Array.from(
  { length: (SLOT_FIN - SLOT_INICIO) / 30 + 1 },
  (_, i) => {
    const m = SLOT_INICIO + i * 30
    return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
  },
)

function madridOffsetMinutes(instant: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: MADRID,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(instant)
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return (asUtc - instant.getTime()) / 60000
}

function citaSlot(dia: Date, hora: string): Date {
  const [h, m] = hora.split(':').map(Number)
  const utcGuess = Date.UTC(dia.getFullYear(), dia.getMonth(), dia.getDate(), h, m)
  const offset = madridOffsetMinutes(new Date(utcGuess))
  const utc = new Date(utcGuess - offset * 60000)
  const offset2 = madridOffsetMinutes(utc)
  return offset2 === offset ? utc : new Date(utcGuess - offset2 * 60000)
}

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    servicio: '',
  })
  const [services, setServices] = useState<Service[]>([])
  const [fechaCita, setFechaCita] = useState<Date | null>(null)
  const [horaCita, setHoraCita] = useState('')
  const [ocupadas, setOcupadas] = useState<Set<number>>(new Set())
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data.docs || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))

    fetch('/api/citas/ocupadas')
      .then(res => res.json())
      .then(data =>
        setOcupadas(
          new Set<number>(
            ((data.fechasOcupadas ?? []) as string[]).map(
              iso => Math.floor(new Date(iso).getTime() / 60000),
            ),
          ),
        ),
      )
      .catch(() => setOcupadas(new Set()))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filterDate = (date: Date) => {
    const weekday = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    ).getUTCDay()
    return weekday >= 1 && weekday <= 5
  }

  const horasDisponibles = useMemo(() => {
    if (!fechaCita) return []
    return HORAS.filter((hora) => {
      const slot = citaSlot(fechaCita, hora)
      if (slot.getTime() <= Date.now()) return false
      return !ocupadas.has(Math.floor(slot.getTime() / 60000))
    })
  }, [fechaCita, ocupadas])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...(fechaCita && horaCita
            ? { fecha_cita: citaSlot(fechaCita, horaCita).toISOString() }
            : {}),
        }),
      })

      const json = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(json?.error || 'Error al enviar el formulario')
      }

      setSuccess(typeof json?.message === 'string' ? json.message : 'Mensaje enviado con éxito.')
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '', servicio: '' })
      setFechaCita(null)
      setHoraCita('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setSubmitting(false)
    }
  }

  const activeServices = services.filter(s => s.activo)

  return (
    <div className={styles.page}>
      <HeaderNav />
      <main className={styles.container}>
        <div className={styles.layout}>
          <section className={styles.visual}>
            <div className={styles.blobPink} aria-hidden="true" />
            <div className={styles.blobGreen} aria-hidden="true" />

            <div className={styles.visualContent}>
              <h1 className={styles.title}>Resuelve tu reto digital</h1>
              {/* <p className={styles.subtitle}>
               Cuéntame el problema y lo desenredamos juntos con una solución que funcione de verdad.
              </p> */}
            </div>
            <div className={styles.collage} aria-hidden="true">
              <Image
                src="/graphic-code-form.png"
                alt=""
                width={520}
                height={194.35}
                priority
                className={`${styles.piece} ${styles.pieceFish}`}
              />
            </div>
          </section>

          <section className={styles.panel}>
            {success && (
              <div className={styles.success}>
                {success}
              </div>
            )}

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre completo <span>*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Tu nombre"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email <span>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="tu@email.com"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="telefono" className={styles.label}>
                Teléfono <span>*</span>
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="+34 600 000 000"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="servicio" className={styles.label}>
              Servicio que necesitas <span>*</span>
            </label>
            <select
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              className={styles.select}
              disabled={loading}
              required
            >
              <option value="">Selecciona un servicio</option>
              {activeServices.map(service => (
                <option key={service.id} value={service.value}>
                  {service.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="fecha_cita" className={styles.label}>
                Día de la cita
              </label>
              <DatePicker
                id="fecha_cita"
                selected={fechaCita}
                onChange={(date: Date | null) => {
                  setFechaCita(date)
                  setHoraCita('')
                }}
                locale={es}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                filterDate={filterDate}
                placeholderText="Elige un día (opcional)"
                className={styles.input}
                wrapperClassName={styles.datepicker}
                isClearable
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="hora_cita" className={styles.label}>
                Hora de la cita
              </label>
              <select
                id="hora_cita"
                name="hora_cita"
                value={horaCita}
                onChange={(e) => setHoraCita(e.target.value)}
                disabled={!fechaCita}
                required={Boolean(fechaCita)}
                className={styles.select}
              >
                {!fechaCita && <option value="">Elige primero un día</option>}
                {fechaCita && (
                  <option value="">
                    {horasDisponibles.length
                      ? 'Selecciona una hora'
                      : 'No hay horas disponibles'}
                  </option>
                )}
                {horasDisponibles.map((hora) => (
                  <option key={hora} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="mensaje" className={styles.label}>
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows={5}
              className={styles.textarea}
              placeholder="Cuéntanos sobre tu proyecto..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting || loading}
            className={styles.button}
          >
            {submitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </section>
    </div>
  </main>
  <Footer />
</div>
  )
}
