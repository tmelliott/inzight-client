export default async function handler(req, res) {
  const r = await fetch("http://localhost:4567/dispatch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state: req.body.state, action: req.body.action }),
  })
  const data = await r.json()

  res.status(200).json(data)
}
