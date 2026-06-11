import { useEffect, useState } from 'react'
import { colors, Typography } from '../styles/tokens'
import portfolioAPI from '../api/portfolio'

export default function Portfolio() {
  const [investments, setInvestments] = useState([])
  const [sector, setSector] = useState(null)

  useEffect(() => {
    portfolioAPI.investments.list(sector).then((res) => {
      setInvestments(res.data)
    })
  }, [sector])

  const sectors = [
    { value: null, label: 'All' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'fintech', label: 'Fintech' },
    { value: 'finance', label: 'Finance' },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.black,
        color: colors.white,
        padding: '100px 40px',
      }}
    >
      <h2
        style={{
          ...Typography.h2,
          backgroundImage: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.blueLight} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Investment Portfolio
      </h2>

      <div style={{ marginTop: 48, marginBottom: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {sectors.map((s) => (
          <button
            key={s.value || 'all'}
            onClick={() => setSector(s.value)}
            style={{
              ...Typography.label,
              padding: '10px 20px',
              backgroundColor:
                sector === s.value
                  ? colors.gold
                  : `rgba(0, 102, 255, 0.1)`,
              color: sector === s.value ? colors.black : colors.white,
              border: `2px solid ${
                sector === s.value ? colors.gold : colors.blue
              }`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: 4,
            }}
            onMouseEnter={(e) => {
              if (sector !== s.value) {
                e.target.style.background = `rgba(0, 102, 255, 0.2)`;
              }
            }}
            onMouseLeave={(e) => {
              if (sector !== s.value) {
                e.target.style.background = `rgba(0, 102, 255, 0.1)`;
              }
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 32,
        }}
      >
        {investments.map((inv) => (
          <div
            key={inv.id}
            style={{
              backgroundColor: `rgba(0, 102, 255, 0.05)`,
              padding: 24,
              borderRadius: 8,
              border: `2px solid ${colors.blue}`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(201, 168, 76, 0.08)`;
              e.currentTarget.style.borderColor = colors.gold;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 102, 255, 0.2)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `rgba(0, 102, 255, 0.05)`;
              e.currentTarget.style.borderColor = colors.blue;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3
              style={{
                ...Typography.h3,
                fontSize: 20,
                color: colors.gold,
              }}
            >
              {inv.company_name}
            </h3>
            <p
              style={{
                ...Typography.label,
                color: colors.blueLight,
                marginTop: 8,
              }}
            >
              {inv.sector.replace('_', ' ').toUpperCase()}
            </p>
            <p style={{ ...Typography.body, marginTop: 16 }}>
              {inv.description}
            </p>
            <p
              style={{
                ...Typography.bodySmall,
                color: colors.muted,
                marginTop: 12,
              }}
            >
              {inv.headline_metric}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
