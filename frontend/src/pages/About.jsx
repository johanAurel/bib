import { colors, Typography } from '../styles/tokens'
import SectionReveal from '../components/ui/SectionReveal'

export default function About() {
  const paragraphs = [
    'Founded by Johan A Botouli, Bib Holdings specializes in identifying and executing high-value deals across technology, real estate, and finance.',
    'With a focus on uncovering undervalued opportunities with strong growth potential, we bring strategic capital and operational expertise to unlock value.',
    'Our portfolio spans emerging technologies, premium real estate assets, and innovative financial instruments—each selected for its ability to generate sustainable, diversified returns.',
    'We believe in being more than passive investors. We partner with founders and leaders to build, scale, and transform their ventures into industry leaders.',
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
