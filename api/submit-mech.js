export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SCRIPT_URL = process.env.APPS_SCRIPT_URL_MECH;
  if (!SCRIPT_URL) {
    return res.status(500).json({ error: 'Script URL not configured' });
  }

  try {
    const body = new URLSearchParams(req.body).toString();
    await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}

export const config = {
  api: { bodyParser: { type: 'application/x-www-form-urlencoded' } }
};
