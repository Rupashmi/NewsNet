const EnvCheck = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔍 Environment Check</h2>
      <p><strong>NewsAPI Key:</strong> {import.meta.env.VITE_NEWS_API_KEY || 'Not found'}</p>
    </div>
  );
};

export default EnvCheck;