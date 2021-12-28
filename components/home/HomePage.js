import { useContext, useRef } from "react"
import AppContext from "../../store/appState"
import Header from "../Header"

function HomePage() {
  const { state, dispatch, action } = useContext(AppContext)

  const urlRef = useRef(null)

  const doDispatch = (e) => {
    e.preventDefault()
    const a = action("LOAD_DATA", {
      file: urlRef.current.value,
    })
    dispatch(a)
  }

  console.log(state)

  return (
    <div className="flex-1">
      <Header />

      <div className="app">
        {!state || state?.docs?.length === 0 ? (
          <form className="flex flex-col items-center w-full md:w-3/4 px-4 mx-auto mt-10 gap-4">
            <label className="font-bold uppercase text-xs">
              First, import some data
            </label>
            <div className="flex w-full gap-2">
              <input
                type="text"
                placeholder="Enter a URL"
                ref={urlRef}
                className="border rounded outline-none py-1 px-2 text-center flex-1"
              />
              <button
                onClick={doDispatch}
                className="bg-green-800 text-gray-200 shadow rounded py-1 px-4 hover:bg-green-700"
              >
                Import
              </button>
            </div>
          </form>
        ) : (
          <>
            <p>Data: {state.docs[0].name}</p>
            <p>URL: {state.docs[0].db_url}</p>
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
      </div>
    </div>
  )
}

export default HomePage

// Next step: connect to this:
// https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
