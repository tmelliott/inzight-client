import Head from "next/head";
import { useContext, useRef } from "react";
import AppContext from "../store/appState";

export default function Home() {
  const { server, state, connect, action, dispatch } = useContext(AppContext);

  const serverRef = useRef(null);

  const handleServer = (e) => {
    e.preventDefault();
    if (serverRef.current.value) connect(serverRef.current.value);
  };

  const doDispatch = () => {
    const a = action("LOAD_DATA", {
      file: "https://www.stat.auckland.ac.nz/~wild/data/data_from_iNZight/Census%20at%20School-500.csv",
    });
    dispatch(a);
  };

  return (
    <div className="">
      <Head>
        <title>iNZight</title>
        <meta name="description" content="iNZight app for web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {!server ? (
          <div className="server-box">
            <p>Please connect to a server:</p>
            <form>
              <input type="text" ref={serverRef} />
              {` `}
              <button type="submit" onClick={handleServer}>
                Connect
              </button>
            </form>
          </div>
        ) : (
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
        )}
      </main>

      <footer className=""></footer>
    </div>
  );
}
