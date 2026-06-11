import { colors, Typography } from '../styles/tokens'
import SectionReveal from '../components/ui/SectionReveal'

export default function About() {
  const paragraphs = [
    'Bib Holdings Limited is an LTD that invests in real estate, fintechs, financial companies, and other high-growth sectors globally.',
    'Our portfolio company, Prime Alpha Securities, operates across the financial services ecosystem — leveraging deep market expertise to identify and execute on strategic opportunities.',
    'We take a concentrated approach: deploying capital into businesses where we can provide not just funding, but strategic direction and operational support.',
    'Based on a structure of complementary holding companies, Prime Alpha Securities is positioned to execute across multiple verticals within the financial landscape.',
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
          About Bib Holdings
        </h2>
      </SectionReveal>

      <div style={{ maxWidth: 800, marginTop: 64 }}>
        {paragraphs.map((para, i) => (
          <SectionReveal key={i} delay={i * 0.1}>
            <p
              style={{
                ...Typography.body,
                marginBottom: 32,
                lineHeight: 1.8,
                borderLeft: `4px solid ${colors.blue}`,
                paddingLeft: 24,
                color: colors.white,
              }}
            >
              {para}
            </p>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}
