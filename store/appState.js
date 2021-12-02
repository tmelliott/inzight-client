import { createContext, useEffect, useState } from "react"
import useSWR from "swr"

const AppContext = createContext({
  state: null,
  action: () => {},
  dispatch: () => {},
  // can add user info, etc, later:
})

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(null)

  useEffect(async () => {
    // get the initial state
    await initState()
  }, [])

  useEffect(async () => {
    console.log("Current state: ", state)
  }, [state])

  const initState = async () => {
    const res = await fetch(`/api/new`)
    const data = await res.json()
    setState(data)
  }

  const action = (action, payload) => ({
    action: action,
    payload: payload,
  })

  const dispatch = async (action) => {
    const res = await fetch("/api/dispatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state, action }),
    })
    const data = await res.json()
    setState(data)
  }

  const context = { state, action, dispatch }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export default AppContext
