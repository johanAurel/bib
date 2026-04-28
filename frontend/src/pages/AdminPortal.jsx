import { useState } from 'react'
import { colors, Typography, Button } from '../styles/tokens'
import AdminDashboard from '../components/admin/AdminDashboard'
import portfolioAPI from '../api/portfolio'

export default function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await portfolioAPI.auth.login(username, password)
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      setIsLoggedIn(true)
      setUsername('')
      setPassword('')
    } catch (err) {
      alert('Login failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.black, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: colors.slateLight,
            padding: 48,
            borderRadius: 8,
            width: '100%',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <h2 style={Typography.h2}>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              ...Typography.body,
              padding: '12px 16px',
              backgroundColor: colors.black,
              color: colors.white,
              border: `1px solid ${colors.muted}`,
              borderRadius: 4,
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...Typography.body,
              padding: '12px 16px',
              backgroundColor: colors.black,
              color: colors.white,
              border: `1px solid ${colors.muted}`,
              borderRadius: 4,
            }}
            required
          />
          <button
            type="submit"
            style={{
              ...Button.primary,
              width: '100%',
            }}
          >
            Login
          </button>
          <p style={{ ...Typography.bodySmall, color: colors.muted, textAlign: 'center' }}>
            Default: admin / admin123
          </p>
        </form>
      </div>
    )
  }

  return <AdminDashboard onLogout={handleLogout} />
}
