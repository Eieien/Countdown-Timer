import { useState } from 'react'

import './main.css'
import ThemeSwitcher from './components/ThemeSwitcher'
import Timer from './components/Timer'

function App() {

  const [timerStatus, setTimerstatus] = useState("idle");

  const handleTimerStatus = (status: string) => {
    setTimerstatus(status);
    console.log(status);
  }

  return (
    <>
      <div>
        <ThemeSwitcher/>
        
      </div>
      <div className='relative w-full min-h-screen'>
        <div className='absolute w-full left-0 top-50'>

          <div className='flex flex-col justify-center gap-2 items-center'>
            <div>
              <h1 className='text-4xl text-center'>Countdown Timer</h1>
              <Timer status={timerStatus}/>

            </div>
            <div className='flex gap-2'>
              <button onClick={() => handleTimerStatus("running")} className='timer-btn'>Start</button>
              <button onClick={() => handleTimerStatus("reset")} className='timer-btn'>Reset</button>
              <button onClick={() => handleTimerStatus("paused")} className='timer-btn'>Pause</button>
            </div>


          </div>
        </div>

      </div>
    </>
  )
}

export default App
