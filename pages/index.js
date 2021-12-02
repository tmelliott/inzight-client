import Head from "next/head"
import { useContext } from "react"
import AppContext from "../store/appState"

export default function Home() {
  const { state, action, dispatch } = useContext(AppContext)

  const doDispatch = () => {
    const a = action("LOAD_DATA", {
      file: "https://www.stat.auckland.ac.nz/~wild/data/data_from_iNZight/Census%20at%20School-500.csv",
    })
    dispatch(a)
  }

  return (
    <div className="">
      <Head>
        <title>iNZight</title>
        <meta name="description" content="iNZight app for web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <p>Import some demo data:</p>
        <button onClick={doDispatch}>Click Me!</button>

        <hr />
        {state?.docs.length > 0 && (
          <>
            <p>Data: {state.docs[0].name}</p>
            <p>
              Variables:{` `}
              <select>
                {state.docs[0].colnames.map((v) => (
                  <option>{v}</option>
                ))}
              </select>
            </p>
          </>
        )}
      </main>

      <footer className=""></footer>
    </div>
  )
}
