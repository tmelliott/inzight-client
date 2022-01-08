import urljoin from "url-join"

export default async function handler(req, res) {
  const { server, path } = req.query

  try {
    const r = await fetch(urljoin(server, `image?path=${path}`), {
      headers: {
        "Content-Type": "image/png",
      },
    })

    if (r.status === 200) {
      const data = r.body
      res.status(200).json(data)
    } else {
      res.status(r.status).json(await r.json())
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Invalid request" })
  }
}
