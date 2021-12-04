export default async function handler(req, res) {
  const { server } = req.query;
  if (!server) res.status(400).json({ message: "No server supplied" });

  try {
    const r = await fetch(`${server}/info`);
    const d = await r.json();
    if (!d.r_version) res.status(200).json({ message: "Not a valid server" });
    res.status(200).json({ url: server, ...d });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid server" });
  }
}
