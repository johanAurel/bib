import { useEffect, useState } from 'react'
import { colors, Typography, Button } from '../../styles/tokens'
import portfolioAPI from '../../api/portfolio'

export default function AdminDashboard({ onLogout }) {
  const [investments, setInvestments] = useState([])
  const [messages, setMessages] = useState([])
  const [tab, setTab] = useState('investments')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    company_name: '',
    sector: 'tech',
    year_acquired: new Date().getFullYear(),
    status: 'active',
    description: '',
    headline_metric: '',
  })

  useEffect(() => {
    portfolioAPI.investments.list().then((res) => setInvestments(res.data))
    portfolioAPI.contact.list().then((res) => setMessages(res.data))
  }, [])

  const handleAddInvestment = async () => {
    try {
      const res = await portfolioAPI.investments.create(formData)
      setInvestments([...investments, res.data])
      setFormData({
        company_name: '',
        sector: 'tech',
        year_acquired: new Date().getFullYear(),
        status: 'active',
        description: '',
        headline_metric: '',
      })
      setShowForm(false)
    } catch (err) {
      alert('Error adding investment')
    }
  }

  const handleDeleteInvestment = async (id) => {
    try {
      await portfolioAPI.investments.delete(id)
      setInvestments(investments.filter((inv) => inv.id !== id))
    } catch (err) {
      alert('Error deleting investment')
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await portfolioAPI.contact.markRead(id)
      setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)))
    } catch (err) {
      alert('Error marking as read')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.black, color: colors.white, padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
        <h1 style={Typography.h1}>Admin Dashboard</h1>
        <button onClick={onLogout} style={Button.secondary}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {['investments', 'messages'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              ...Typography.label,
              padding: '12px 24px',
              backgroundColor: tab === t ? colors.gold : colors.slateLight,
              color: tab === t ? colors.black : colors.white,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'investments' && (
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ ...Button.primary, marginBottom: 24 }}
          >
            {showForm ? 'Cancel' : 'Add Investment'}
          </button>

          {showForm && (
            <div
              style={{
                backgroundColor: colors.slateLight,
                padding: 24,
                borderRadius: 8,
                marginBottom: 32,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 16,
              }}
            >
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                style={{
                  padding: '12px 16px',
                  backgroundColor: colors.black,
                  color: colors.white,
                  border: `1px solid ${colors.muted}`,
                  borderRadius: 4,
                }}
              />
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                style={{
                  padding: '12px 16px',
                  backgroundColor: colors.black,
                  color: colors.white,
                  border: `1px solid ${colors.muted}`,
                  borderRadius: 4,
                }}
              >
                <option value="tech">Technology</option>
                <option value="real_estate">Real Estate</option>
                <option value="finance">Finance</option>
              </select>
              <input
                type="number"
                placeholder="Year"
                value={formData.year_acquired}
                onChange={(e) => setFormData({ ...formData, year_acquired: parseInt(e.target.value) })}
                style={{
                  padding: '12px 16px',
                  backgroundColor: colors.black,
                  color: colors.white,
                  border: `1px solid ${colors.muted}`,
                  borderRadius: 4,
                }}
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  gridColumn: '1 / -1',
                  padding: '12px 16px',
                  backgroundColor: colors.black,
                  color: colors.white,
                  border: `1px solid ${colors.muted}`,
                  borderRadius: 4,
                  fontFamily: 'inherit',
                  minHeight: 100,
                }}
              />
              <input
                type="text"
                placeholder="Headline Metric"
                value={formData.headline_metric}
                onChange={(e) => setFormData({ ...formData, headline_metric: e.target.value })}
                style={{
                  gridColumn: '1 / -1',
                  padding: '12px 16px',
                  backgroundColor: colors.black,
                  color: colors.white,
                  border: `1px solid ${colors.muted}`,
                  borderRadius: 4,
                }}
              />
              <button onClick={handleAddInvestment} style={{ ...Button.primary, gridColumn: '1 / -1' }}>
                Create Investment
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {investments.map((inv) => (
              <div
                key={inv.id}
                style={{
                  backgroundColor: colors.slateLight,
                  padding: 20,
                  borderRadius: 8,
                  position: 'relative',
                }}
              >
                <h3 style={{ ...Typography.h3, fontSize: 18, marginBottom: 8 }}>{inv.company_name}</h3>
                <p style={{ ...Typography.label, color: colors.gold }}>{inv.sector.replace('_', ' ').toUpperCase()}</p>
                <p style={{ ...Typography.bodySmall, color: colors.muted, marginTop: 8 }}>{inv.description}</p>
                <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleDeleteInvestment(inv.id)}
                    style={{
                      ...Typography.label,
                      padding: '8px 16px',
                      backgroundColor: colors.error || '#E74C3C',
                      color: colors.white,
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'messages' && (
        <div>
          {messages.length === 0 ? (
            <p style={Typography.body}>No messages yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    backgroundColor: colors.slateLight,
                    padding: 20,
                    borderRadius: 8,
                    borderLeft: `4px solid ${msg.read ? colors.muted : colors.gold}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <p style={{ ...Typography.label }}>{msg.name}</p>
                      <p style={{ ...Typography.bodySmall, color: colors.muted }}>{msg.email}</p>
                      <p style={{ ...Typography.body, marginTop: 12 }}>{msg.message}</p>
                    </div>
                    {!msg.read && (
                      <button
                        onClick={() => handleMarkAsRead(msg.id)}
                        style={{
                          ...Typography.label,
                          padding: '8px 16px',
                          backgroundColor: colors.gold,
                          color: colors.black,
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
