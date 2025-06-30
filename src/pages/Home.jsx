import { useEffect, useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import ArticleCard from '../components/ArticleCard';
import ArticleDetail from '../components/ArticleDetail';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

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
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`
        );
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
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (e) {
        setError('Failed to fetch articles.');
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <div className="page-wrapper">
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
