import urljoin from "url-join"

export default async function handler(req, res) {
  const { server } = req.body

  try {
    const r = await fetch(urljoin(server, "dispatch"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: req.body.state, action: req.body.action }),
    })
    if (r.status === 200) {
      const data = await r.json()
      res.status(200).json(data)
    } else {
      res.status(r.status).json(await r.json())
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Invalid request" })
  }
}
