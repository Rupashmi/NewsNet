export const summarizeWithGemini = async (text) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `Summarize the following in 3 bullet points:\n\n${text}` }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const response = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return response;
  } catch (err) {
    console.error('Gemini summarization failed:', err);
    return 'Failed to summarize.';
  }
};
