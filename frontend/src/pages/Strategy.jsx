import { colors, Typography } from '../styles/tokens'
import SectionReveal from '../components/ui/SectionReveal'

const strategies = [
  {
    title: 'Technology Ventures',
    desc: 'Investing in transformative technologies: AI, fintech, climate tech, and deep tech innovation with proven founders.',
  },
  {
    title: 'Real Estate',
    desc: 'Premium residential and commercial properties with strategic location and value-add development potential.',
  },
  {
    title: 'Financial Innovation',
    desc: 'Alternative assets, structured products, and emerging financial instruments with asymmetric risk-reward profiles.',
  },
  {
    title: 'Deal Execution',
    desc: 'Active ownership approach: strategic guidance, operational improvements, and value creation throughout the holding period.',
  },
]

export default function Strategy() {
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
          Investment Strategy
        </h2>
      </SectionReveal>

      <div
        style={{
          marginTop: 64,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40,
        }}
      >
        {strategies.map((strategy, i) => (
          <SectionReveal key={i} delay={i * 0.1}>
            <div
              style={{
                backgroundColor: `rgba(0, 102, 255, 0.05)`,
                padding: 32,
                borderRadius: 8,
                borderLeft: `4px solid ${colors.gold}`,
                borderTop: `2px solid ${colors.blue}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(201, 168, 76, 0.08)`;
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(0, 102, 255, 0.25)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `rgba(0, 102, 255, 0.05)`;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3
                style={{
                  ...Typography.h3,
                  fontSize: 20,
                  marginBottom: 16,
                  color: colors.gold,
                }}
              >
                {strategy.title}
              </h3>
              <p
                style={{
                  ...Typography.body,
                  color: colors.white,
                  lineHeight: 1.8,
                }}
              >
                {strategy.desc}
              </p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}
