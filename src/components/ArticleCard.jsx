import { useState } from 'react';
import { summarizeWithGemini } from '../utils/summarizeWithGemini';

const ArticleCard = ({ article }) => {
  const [expanded, setExpanded] = useState(false);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    try {
      const content = `${article.title}\n\n${article.description}`;
      const result = await summarizeWithGemini(content);
      setSummary(result);
    } catch (err) {
      setError('Summarization failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="article-thumb"
        />
      )}

      <div className="article-info">
        <h2 className="article-title">{article.title}</h2>
        <p className="article-source">{article.source?.name || 'Unknown'}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="details-btn"
        >
          {expanded ? 'Hide Details' : 'Details'}
        </button>

        {expanded && (
          <div className="article-extra">
            <p><strong>Date:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
            <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
            <p><strong>Source:</strong> {article.source?.name || 'N/A'}</p>

            {/* ✅ Button container */}
            <div className="action-buttons">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-full-btn"
              >
                Read Full Article
              </a>

              <button
                className="details-btn"
                onClick={handleSummarize}
              >
                Summarize
              </button>
            </div>

            {loading && (
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Summarizing...</p>
            )}

            {error && (
              <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>
            )}

            {summary && (
              <div className="summary-output">
                <h4 style={{ marginTop: '0.75rem' }}>Summary:</h4>
                <ul style={{ paddingLeft: '1rem' }}>
                  {summary.split('\n').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
