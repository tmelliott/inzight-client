import { useContext, useEffect, useRef, useState } from "react"
import AppContext from "../../store/appState"
import Header from "../Header"
import VariableBox from "./VariableBox"
import Image from "next/image"

function HomePage() {
  const { server, state, dispatch, action, view } = useContext(AppContext)
  const [doc, setDoc] = useState(null)
  const [graph, setGraph] = useState("")

  // const { data, setData } = useState([])

  useEffect(async () => {
    if (!state) return
    console.log(state)
    const activeDoc = state.documents.active[0] - 1
    if (activeDoc < 0) return
    const curDoc = state.documents.docs[activeDoc]
    setDoc(curDoc)

    const res = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ server: server.url, state }),
    })
    const str = await res.json()
    setGraph(`data:image/png;base64,${str[0]}`)

    // const dat = view(1, 10) // page, nPerPage
    // console.log(dat)
    // setData(dat)
  }, [state])

  const urlRef = useRef(null)

  const doDispatch = (e) => {
    e.preventDefault()
    const a = action("LOAD_DATA", {
      file: urlRef.current.value,
    })
    dispatch(a)
  }

  const dispatchAction = (what, payload) => {
    const a = action(what, payload)
    dispatch(a)
  }

  const examples = [
    {
      name: "Census at School 500",
      url: "https://www.stat.auckland.ac.nz/~wild/data/data_from_iNZight/Census%20at%20School-500.csv",
    },
  ]
  const useExample = (e) => {
    const a = action("LOAD_DATA", {
      file: e.url,
      name: e.name,
    })
    dispatch(a)
  }

  return (
    <div className="flex-1">
      <Header />

      <div className="app">
        {!state || doc === null ? (
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

            <hr />
            <p>Or try some examples:</p>
            <ul>
              {examples.map((eg) => (
                <li
                  className="text-blue-800 hover:text-blue-700 cursor-pointer"
                  onClick={() => useExample(eg)}
                >
                  {eg.name}
                </li>
              ))}
            </ul>
          </form>
        ) : (
          <div className="flex flex-col md:flex-row m-2">
            <div className="md:w-96 bg-gray-100 rounded-xl p-2">
              <p className="font-bold mb-2">Data: {doc.name}</p>

              <VariableBox
                name={doc.controls.controls.v1.name[0]}
                value={doc.controls.controls.v1.value[0]}
                options={doc.controls.controls.v1.options}
                handler={(payload) => dispatchAction("SET_V1", payload)}
              />
              <VariableBox
                name={doc.controls.controls.v2.name[0]}
                value={doc.controls.controls.v2.value[0]}
                options={doc.controls.controls.v2.options}
                handler={(payload) => dispatchAction("SET_V2", payload)}
              />
              <VariableBox
                name={doc.controls.controls.g1.name[0]}
                value={doc.controls.controls.g1.value[0]}
                options={doc.controls.controls.g1.options}
                handler={(payload) => dispatchAction("SET_G1", payload)}
              />
              <VariableBox
                name={doc.controls.controls.g2.name[0]}
                value={doc.controls.controls.g2.value[0]}
                options={doc.controls.controls.g2.options}
                handler={(payload) => dispatchAction("SET_G2", payload)}
              />
            </div>

            <div className="ml-5">
              {graph !== "" && (
                <Image
                  src={graph}
                  width={state.graph.dimensions[0]}
                  height={state.graph.dimensions[1]}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage

// Next step: connect to this:
// https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
