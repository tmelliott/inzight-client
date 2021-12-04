import urljoin from "url-join"

export default async function handler(req, res) {
  const { server } = req.body
  const r = await fetch(urljoin(server, "dispatch"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state: req.body.state, action: req.body.action }),
  })
  const data = await r.json()
  console.log(data)
  res.status(200).json(data)
}
