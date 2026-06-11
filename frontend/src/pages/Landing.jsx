import { useEffect, useState } from 'react'
import { colors, Typography } from '../styles/tokens'
import InteractiveGlobe from '../components/three/InteractiveGlobe'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import SectionReveal from '../components/ui/SectionReveal'
import portfolioAPI from '../api/portfolio'

export default function Landing() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    portfolioAPI.stats.list().then((res) => setStats(res.data))
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.black, color: colors.white }}>
      <InteractiveGlobe />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: 80,
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              ...Typography.h1,
              fontSize: 96,
              backgroundImage: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.blueLight} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 16,
              fontWeight: 900,
            }}
          >
            BIB HOLDINGS
          </h1>
          <p
            style={{
              ...Typography.body,
              fontSize: 24,
              background: `linear-gradient(135deg, ${colors.blueLight} 0%, ${colors.gold} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}
          >
            Prime Alpha Securities — Our Portfolio Company
          </p>
        </div>

        <div
          style={{
            marginTop: 80,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 48,
            width: '100%',
            maxWidth: 1000,
            padding: '0 40px',
          }}
        >
          {stats.length > 0 ? (
            stats.map((stat) => (
              <SectionReveal key={stat.id}>
                <div
                  style={{
                    padding: 24,
                    borderRadius: 8,
                    border: `2px solid ${colors.blue}`,
                    background: `linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(201, 168, 76, 0.1) 100%)`,
                  }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p
                    style={{
                      ...Typography.label,
                      color: colors.gold,
                      marginTop: 16,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </SectionReveal>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', color: colors.muted }}>
              Loading stats...
            </div>
          )}
        </div>
      </div>

      <div style={{ height: '100vh' }} />
    </div>
  )
}
