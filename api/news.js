export default async function handler(req, res) {
  const { category, keyword } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

 const endpoint = keyword
  ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${apiKey}`
  : `https://newsapi.org/v2/everything?q=${encodeURIComponent(category)}&apiKey=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
