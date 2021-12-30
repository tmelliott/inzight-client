import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
  const collection = req.query.collection
  console.log(collection)

  try {
    const client = await clientPromise
    const db = client.db()
    const dat = db.collection(collection)
    const df = await dat.find().toArray()
    console.log(df)

    res.status(400).json({
      data: df || null,
    })
  } catch (e) {
    console.error(e)
    res.status(400).json(null)
  }
}
