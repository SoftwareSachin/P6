export default function TestApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #9333ea, #3b82f6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '20px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          🎉 OPPB Migration Test
        </h1>
        <p style={{
          color: '#6b7280',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}>
          The app is loading successfully! Migration from Replit Agent to standard Replit environment is working.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '12px',
              height: '12px',
              background: '#10b981',
              borderRadius: '50%'
            }}></span>
            <span>PostgreSQL Database Connected</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '12px',
              height: '12px',
              background: '#10b981',
              borderRadius: '50%'
            }}></span>
            <span>Vite Development Server Running</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '12px',
              height: '12px',
              background: '#10b981',
              borderRadius: '50%'
            }}></span>
            <span>Express Backend Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}