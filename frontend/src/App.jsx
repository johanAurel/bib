import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { colors, Typography, Button } from './styles/tokens'
import CustomCursor from './components/ui/CustomCursor'
import Landing from './pages/Landing'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Strategy from './pages/Strategy'
import Contact from './pages/Contact'

function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '24px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        borderBottom: `2px solid ${colors.blue}`,
      }}
    >
      <Link
        to="/"
        style={{
          backgroundImage: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.blue} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none',
          ...Typography.h3,
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        BIB
      </Link>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <Link
          to="/about"
          style={{
            color: colors.white,
            textDecoration: 'none',
            ...Typography.body,
            transition: 'all 0.3s ease',
            borderBottom: '2px solid transparent',
          }}
          onMouseEnter={(e) => (e.target.style.borderBottomColor = colors.blue)}
          onMouseLeave={(e) => (e.target.style.borderBottomColor = 'transparent')}
        >
          About
        </Link>
        <Link
          to="/portfolio"
          style={{
            color: colors.white,
            textDecoration: 'none',
            ...Typography.body,
            transition: 'all 0.3s ease',
            borderBottom: '2px solid transparent',
          }}
          onMouseEnter={(e) => (e.target.style.borderBottomColor = colors.blue)}
          onMouseLeave={(e) => (e.target.style.borderBottomColor = 'transparent')}
        >
          Portfolio
        </Link>
        <Link
          to="/strategy"
          style={{
            color: colors.white,
            textDecoration: 'none',
            ...Typography.body,
            transition: 'all 0.3s ease',
            borderBottom: '2px solid transparent',
          }}
          onMouseEnter={(e) => (e.target.style.borderBottomColor = colors.blue)}
          onMouseLeave={(e) => (e.target.style.borderBottomColor = 'transparent')}
        >
          Strategy
        </Link>
        <Link
          to="/contact"
          style={{
            color: colors.white,
            textDecoration: 'none',
            ...Typography.body,
            transition: 'all 0.3s ease',
            borderBottom: '2px solid transparent',
          }}
          onMouseEnter={(e) => (e.target.style.borderBottomColor = colors.gold)}
          onMouseLeave={(e) => (e.target.style.borderBottomColor = 'transparent')}
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: colors.black,
        borderTop: `2px solid ${colors.blue}`,
        padding: '48px 40px',
        color: colors.white,
        ...Typography.bodySmall,
        textAlign: 'center',
      }}
    >
      <p style={{ color: colors.gold, fontWeight: 600 }}>© 2026 Bib Holdings Limited. All rights reserved.</p>
      <p style={{ marginTop: 8, color: colors.blueLight }}>Bib Holdings Limited — Global Investments</p>
    </footer>
  )
}

export default function App() {
  return (
    <Router>
      <div
        style={{
          backgroundColor: colors.black,
          color: colors.white,
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${colors.black} 0%, rgba(0, 102, 255, 0.05) 50%, ${colors.black} 100%)`,
        }}
      >
        <CustomCursor />
        <Navbar />
        <main style={{ paddingTop: 80 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
