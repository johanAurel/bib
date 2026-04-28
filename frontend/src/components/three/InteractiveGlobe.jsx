export default function InteractiveGlobe() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: 'linear-gradient(135deg, #050810 0%, #0a0e27 25%, #0d1428 50%, #0a0e27 75%, #050810 100%)',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse 1400px 800px at 50% 30%, rgba(0, 102, 255, 0.12) 0%, transparent 50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 51, 102, 0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}
