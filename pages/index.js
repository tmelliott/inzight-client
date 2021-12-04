import Head from "next/head"
import { useContext } from "react"
import Connect from "../components/Connect"
import HomePage from "../components/home/HomePage"
import AppContext from "../store/appState"

export default function Home() {
  const { server } = useContext(AppContext)

  // const doDispatch = () => {
  //   const a = action("LOAD_DATA", {
  //     file: "https://www.stat.auckland.ac.nz/~wild/data/data_from_iNZight/Census%20at%20School-500.csv",
  //   });
  //   dispatch(a);
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>iNZight</title>
        <meta name="description" content="iNZight app for web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {server ? <HomePage /> : <Connect />}
      {/* <div className="server-box">
          <>
            <div className="header">
              <p>Connected to: {server.url}</p>
              <p>R version: {server.r_version}</p>
              <p>inzight version: {server.inzight_version}</p>
            </div>

            <p>Import some demo data:</p>
            <button onClick={doDispatch}>Click Me!</button>

            <hr />
            {state?.docs?.length > 0 && (
              <>
                <p>Data: {state.docs[0].name}</p>
                <p>
                  Variables:{` `}
                  <select>
                    {state.docs[0].colnames.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </p>
              </>
            )}
          </>
        )} */}

      <footer className="bg-gray-800 text-gray-200 text-right p-2 text-xs">
        &copy; inzight 2021
      </footer>
    </div>
  )
}
