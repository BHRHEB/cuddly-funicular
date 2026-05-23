export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter missing" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Referer': 'https://www.pornhub.com/'
      }
    });

    const contentType = response.headers.get('content-type') || 'text/html';
    const data = await response.text();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy failed", message: error.message });
  }
}
