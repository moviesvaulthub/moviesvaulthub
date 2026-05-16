// api/proxy.js
export default async function handler(req, res) {
  // Get the path from the query (e.g., ?path=/wp-json/wp/v2/posts)
  const targetPath = req.query.path || '';
  const targetUrl = `https://thenkiri.com${targetPath}`;
  
  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    
    // Add CORS headers so your frontend can use it
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
}