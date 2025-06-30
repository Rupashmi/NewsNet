import { useState } from 'react';
import { summarizeWithGemini } from '../utils/summarizeWithGemini';

const ArticleDetail = ({ article }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    const content = `${article.title}\n\n${article.description}`;
    const result = await summarizeWithGemini(content);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white article-detail">
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <p><strong>Source:</strong> {article.source?.name || 'N/A'}</p>
      <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
      <p><strong>Date:</strong> {new Date(article.publishedAt).toLocaleString()}</p>

      {/* ✅ Read Full Article Button */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="read-full-btn"
      >
        Read Full Article
      </a>

      <button
        onClick={handleSummarize}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded block"
      >
        Summarize
      </button>

      {loading && <p className="mt-2 text-sm text-gray-500">Summarizing...</p>}

      {summary && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <h3 className="font-semibold mb-2">Summary:</h3>
          <ul className="list-disc ml-5 space-y-1">
            {summary.split('\n').map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
