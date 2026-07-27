"use client"

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface Service {
  id: string
  titulo: string
  descripcion: string
  precio: number
  activo: boolean
  icono?: string
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
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data.docs || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Error al enviar el formulario')

      setSuccess(true)
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '', servicio: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setSubmitting(false)
    }
  }

  const activeServices = services.filter(s => s.activo)

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Contáctanos</h1>
        <p className={styles.subtitle}>
          Cuéntanos sobre tu proyecto y te ayudamos a hacerlo realidad.
        </p>

        {success && (
          <div className={styles.success}>
            ¡Mensaje enviado con éxito! Te contactaremos pronto.
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
              Nombre completo *
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

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email *
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
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={styles.input}
              placeholder="+34 600 000 000"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="servicio" className={styles.label}>
              Servicio que necesitas
            </label>
            <select
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              className={styles.select}
              disabled={loading}
            >
              <option value="">Selecciona un servicio</option>
              {activeServices.map(service => (
                <option key={service.id} value={service.titulo}>
                  {service.titulo}
                </option>
              ))}
            </select>
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
      </div>
    </main>
  )
}
