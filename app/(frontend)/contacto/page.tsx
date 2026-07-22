"use client"

import { useState } from 'react'
import styles from './page.module.css'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    servicio: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

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
            >
              <option value="">Selecciona un servicio</option>
              <option value="web">Desarrollo Web</option>
              <option value="mobile">App Móvil</option>
              <option value="uiux">Diseño UI/UX</option>
              <option value="consulting">Consultoría</option>
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
            disabled={submitting}
            className={styles.button}
          >
            {submitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </main>
  )
}
