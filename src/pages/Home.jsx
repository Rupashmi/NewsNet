import { useEffect, useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import ArticleCard from '../components/ArticleCard';
import ArticleDetail from '../components/ArticleDetail';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

console.log("Live API KEY:", import.meta.env.VITE_NEWS_API_KEY);

const Home = () => {
  const [category, setCategory] = useState('technology');
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  // ✅ This must come BEFORE return
  const handleSearch = (keyword) => {
    const fetchSearchedArticles = async () => {
      try {
        setError('');
        setSelected(null);
        const res = await fetch(`/api/news?keyword=${keyword}`);
        const data = await res.json();
        if (!data.articles || data.articles.length === 0) {
          setError('No articles found for your search.');
          setArticles([]);
        } else {
          setArticles(data.articles);
        }
      } catch (e) {
        setError('Failed to fetch search results.');
      }
    };

    fetchSearchedArticles();
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setError('');
        console.log("Fetching category:", category);
        const res = await fetch(`/api/news?category=${category}`);
        const data = await res.json();
        console.log("Fetched data:", data);
        setArticles(data.articles || []);
      } catch (e) {
        setError('Failed to fetch articles.');
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <div className="page-wrapper">
      <p style={{ color: 'red', fontSize: '0.9rem' }}>
  ENV KEY: {import.meta.env.NEWS_API_KEY || 'Not found'}
</p>
      <CategoryTabs selected={category} onSelect={setCategory} onSearch={handleSearch} />

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="article-grid">
        {articles.map(article => (
          <ArticleCard key={article.url} article={article} onClick={setSelected} />
        ))}
      </div>

      {selected && <ArticleDetail article={selected} />}
    </div>
  );
};

export default Home;
