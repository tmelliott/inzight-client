import Image from "next/image"
import { useContext, useRef } from "react"
import AppContext from "../store/appState"

function Connect() {
  const { server, connect } = useContext(AppContext)

  const serverRef = useRef(null)
  const btnRef = useRef(null)

  const handleServer = (e) => {
    e.preventDefault()
    if (serverRef.current.value) connect(serverRef.current.value)
  }

  console.log(server)

  return (
    <div className="flex-1 flex flex-col items-center pt-10">
      <Image src="/inzight_logo.svg" height={100} width={500} />

      <form className="flex flex-col mt-10 w-96 gap-2 text-center">
        <label className="font-bold text-xs uppercase">
          Connect to a server to begin
        </label>
        <input
          type="text"
          ref={serverRef}
          className="border rounded outline-none py-1 px-2 text-center"
        />
        <button
          type="submit"
          ref={btnRef}
          onClick={handleServer}
          className="bg-green-800 text-gray-200 shadow rounded py-1 px-2"
        >
          Connect
        </button>
      </form>
    </div>
  )
}

export default Connect
