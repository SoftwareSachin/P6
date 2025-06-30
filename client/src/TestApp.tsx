export default function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>OPPB Test App</h1>
      <p>If you can see this, React is working!</p>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h2>Test Successful</h2>
        <p>The React application is loading correctly.</p>
      </div>
    </div>
  );
}