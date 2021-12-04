import urljoin from "url-join"

export default async function handler(req, res) {
  const { server } = req.query
  const r = await fetch(urljoin(server, "new"))
  const data = await r.json()

  res.status(200).json(data)
}
