import { useState } from 'react'
import { colors, Typography, Button } from '../styles/tokens'
import SectionReveal from '../components/ui/SectionReveal'
import portfolioAPI from '../api/portfolio'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await portfolioAPI.contact.submit(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      alert('Error submitting form')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.black,
        color: colors.white,
        padding: '100px 40px',
      }}
    >
      <SectionReveal>
        <h2
          style={{
            ...Typography.h2,
            backgroundImage: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.blueLight} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Get In Touch
        </h2>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        {submitted ? (
          <p
            style={{
              ...Typography.body,
              marginTop: 32,
              color: colors.goldLight,
              fontSize: 18,
            }}
          >
            Message received. We'll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 48,
              maxWidth: 600,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                ...Typography.body,
                padding: '12px 16px',
                backgroundColor: `rgba(0, 102, 255, 0.05)`,
                color: colors.white,
                border: `2px solid ${colors.blue}`,
                borderRadius: 4,
              }}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{
                ...Typography.body,
                padding: '12px 16px',
                backgroundColor: `rgba(0, 102, 255, 0.05)`,
                color: colors.white,
                border: `2px solid ${colors.blue}`,
                borderRadius: 4,
              }}
              required
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={6}
              style={{
                ...Typography.body,
                padding: '12px 16px',
                backgroundColor: `rgba(0, 102, 255, 0.05)`,
                color: colors.white,
                border: `2px solid ${colors.blue}`,
                borderRadius: 4,
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
              required
            />
            <button
              type="submit"
              style={{
                ...Button.primary,
                alignSelf: 'flex-start',
                background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldLight} 100%)`,
                boxShadow: `0 4px 15px rgba(201, 168, 76, 0.3)`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 8px 25px rgba(201, 168, 76, 0.5)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = `0 4px 15px rgba(201, 168, 76, 0.3)`;
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </SectionReveal>
    </div>
  )
}
