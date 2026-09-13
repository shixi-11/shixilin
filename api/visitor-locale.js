import { countryLocale } from '../lib/locale-detection.js'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end()
  }
  // Vercel supplies this country code; no third-party IP lookup is needed.
  return res.status(200).json({ locale: countryLocale(req.headers['x-vercel-ip-country']) })
}
