import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const passGenerator = useCallback(() => {
    let pass = ''
    let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm'
    if (numAllowed) str += '1234567890'
    if (charAllowed) str += '~!@#$%^&*()_+=-\|/?'
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))

    }
    console.log('pass', pass);
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  console.log('password', password);

  useEffect(() => {
    passGenerator()
  }, [length, numAllowed, charAllowed, setPassword])

  const passRef=useRef(null)
  const copy=useCallback(()=>{
   passRef.current?.select()
   passRef.current?.setSelectionRange(0,101)
   window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className=' shadow-2xl '>
        <h2 className='text-2xl font-semibold p-8'>Password Generator</h2>
        <div className=' p-2 flex justify-center items-center w-[600px] bg-teal-300'>
          <input type="text" readOnly ref={passRef} value={password}
            className='grow px-3 py-1 ' />
          <button onClick={copy} className='w-[90px] bg-green-200 py-1 hover:bg-green-400 active:scale-95' >Copy</button>
        </div>
        <div className='flex justify-center items-center bg-teal-200 w-[600px] p-2 '>
          <input type="range" id="0" min={6} max={100} value={length} onChange={(e) => setLength(e.target.value)} 
          className='grow px-2 '/>
          <label htmlFor="0" className='pl-2 pr-6'>Length</label>
          <input type="checkbox" id='1' checked={numAllowed} onChange={() => setNumAllowed((prev) => !prev)} />
          <label htmlFor="1" className='pl-1 pr-6'>Number</label>
          <input type="checkbox" id='2' checked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} />
          <label htmlFor="2" className='pl-1 pr-6'>Special Characters</label>
        </div>
      </div>

    </>
  )
}

export default App
