import { useEffect, useState } from "react"

function VariableBox({ name, value, options, handler }) {
  const [v, setV] = useState(value)

  const setValue = (e) => {
    e.preventDefault()
    setV(e.target.value)
  }

  useEffect(() => {
    if (v === value) return
    handler({ value: v })
  }, [v])

  return (
    <div className="flex my-3 text-sm items-center">
      <label className="font-bold w-1/2 text-right mr-2">{name}</label>
      <select
        value={v}
        onChange={setValue}
        className="w-1/2 p-2 bg-gray-50 rounded"
      >
        <option value=""></option>
        {options.map((o) => (
          <option value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

export default VariableBox
