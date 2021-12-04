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
            <input
              type="text"
              placeholder="Enter a URL"
              ref={urlRef}
              className="border rounded outline-none py-1 px-2 text-center w-full"
            />
            <button onClick={doDispatch}>Click Me!</button>
          </form>
        ) : (
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
      </div>
    </div>
  )
}

export default HomePage
