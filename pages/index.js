import Head from "next/head"
import { useContext } from "react"
import Connect from "../components/Connect"
import HomePage from "../components/home/HomePage"
import AppContext from "../store/appState"

export default function Home() {
  const { server } = useContext(AppContext)

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>iNZight</title>
        <meta name="description" content="iNZight app for web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {server ? <HomePage /> : <Connect />}

      <footer className="bg-gray-800 text-gray-200 text-right p-2 text-xs">
        &copy; inzight 2022
      </footer>
    </div>
  )
}
