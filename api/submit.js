/**
 * Vercel Serverless Proxy — TerraTern Lead Gen
 * 
 * Sits on the same origin as the landing page so the browser
 * has no cross-origin issue. Forwards the payload to the
 * actual backend server-side where CORS doesn't apply.
 * 
 * Deploy: place this file at /api/submit.js in your Vercel project root.
 * It will be available at: https://your-vercel-domain.vercel.app/api/submit
 */

const TARGET_URL = 'https://backend.terratern.in/api/common-lead-gen';
const BASIC_AUTH = 'Basic ' + Buffer.from('someone:adminQWE').toString('base64');

export default async function handler(req, res) {

  // Allow OPTIONS preflight (though not needed for same-origin, belt-and-suspenders)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[proxy] Incoming payload:', JSON.stringify(req.body));

    const backendRes = await fetch(TARGET_URL, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': BASIC_AUTH,
      },
      body: JSON.stringify(req.body),
    });

    const responseText = await backendRes.text();
    console.log('[proxy] Backend status:', backendRes.status);
    console.log('[proxy] Backend response:', responseText);

    // Forward status + body back to the browser
    res.status(backendRes.status);
    try {
      res.json(JSON.parse(responseText));
    } catch {
      res.send(responseText);
    }

  } catch (err) {
    console.error('[proxy] Fetch to backend failed:', err.message);
    res.status(502).json({ error: 'Proxy error', detail: err.message });
  }
}
