import { createContext, useEffect, useState } from "react"

const AppContext = createContext({
  server: null,
  state: null,
  connect: () => {},
  action: () => {},
  dispatch: () => {},
  // can add user info, etc, later:
})

export const AppContextProvider = ({ children }) => {
  const [server, setServer] = useState()
  const [state, setState] = useState(null)

  useEffect(() => {
    connect("http://localhost:4567")
  }, [])

  useEffect(async () => {
    // get the initial state
    console.log("Server changed ...", server)
    await initState()
  }, [server])

  useEffect(async () => {
    // console.log("Current state: ", state)
  }, [state])

  const initState = async () => {
    if (!server || !server?.r_version) return
    const res = await fetch(`/api/new?server=${server.url}`)
    const data = await res.json()
    setState(data)
  }

  const connect = async (url) => {
    console.log("Connecting to " + url)
    // first get info
    const res = await fetch(`/api/connect?server=${url}`)
    if (res.status !== 200) {
      const data = await res.json()
      console.log(data.message)
      setServer(null)
    } else {
      const data = await res.json()
      setServer(data)
    }
  }

  const action = (action, payload) => ({
    action: action,
    payload: payload,
  })

  const dispatch = async (action) => {
    if (!server || !server?.r_version) return
    console.log("DISPATCHING", action)
    const res = await fetch("/api/dispatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ server: server.url, state, action }),
    })
    const data = await res.json()
    setState(data)
  }

  const context = { server, state, connect, action, dispatch }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export default AppContext
