import { useContext } from "react"
import AppContext from "../store/appState"

function Header() {
  const { server } = useContext(AppContext)

  return (
    <div className="bg-gray-50 shadow flex justify-between items-center p-1">
      <div className="flex items-end italic gap-2">
        <img src="/inzight_logo.svg" className="h-6" />
      </div>
      <div className="flex flex-col text-xxs text-right">
        <p>Connected to: {server.url}</p>
        <p>
          R {server.r_version} &ndash; inzight {server.inzight_version}
        </p>
      </div>
    </div>
  )
}

export default Header
