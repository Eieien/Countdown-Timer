import { useState } from 'react'

import './main.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <div>
          <h1 className='text-4xl'>Countdown Timer</h1>
          <h1 className='text-4xl text-center'>
            4:00
          </h1>

        </div>
        <div className='flex gap-2'>
          <button>Start</button>
          <button>Reset</button>
          <button>Pause</button>
        </div>


      </div>
    </>
  )
}

export default App
