import { useState } from 'react'
import './App.css'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialAllowed, setSpecialAllowed] = useState(false)
  const [password,setPassword] = useState("")

  // useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed)
      str += "0123456789"

    if(specialAllowed)
      str += "@!_&*(){}[]?"

    for(let i=1; i<=length; i++)
    {
      let char = Math.random() * str.length + 1
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length,numberAllowed,specialAllowed, setPassword])

  const copyPassowrdToClipboard = useCallback(() => {
      // to give some visual appeal to the user
      passwordRef.current?.select()
      // passwordRef.current?.setSelectionRange(0,3)
      window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,specialAllowed])

  return (
    <>
      <h1 className='mt-5 text-4xl text-center text-white'>Password generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password} 
            className='outline-none w-full py-1 px-3'  
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />    
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPassowrdToClipboard}
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>  
            <input type="range" name="" id="" 
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setlength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                    setNumberAllowed((prev) => !prev);
                }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
                <input
                    type="checkbox"
                    defaultChecked={specialAllowed}
                    id="characterInput"
                    onChange={() => {
                        setSpecialAllowed((prev) => !prev )
                    }}
                />
                <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
