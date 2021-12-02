export default async function handler(req, res) {
  const r = await fetch("http://localhost:4567/new")
  const data = await r.json()

  res.status(200).json(data)
}
