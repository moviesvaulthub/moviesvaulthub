// api/proxy.js
export default async function handler(req, res) {
  // Allow CORS (so your frontend can call this function)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Get the target URL from the query string
  const target = req.query.url;
  if (!target) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  
  try {
    const response = await fetch(target);
    const data = await response.text();
    // If it's JSON, parse and send as JSON; otherwise send as text
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.status(200).json(JSON.parse(data));
    } else {
      return res.status(200).send(data);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}