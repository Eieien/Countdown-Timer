import { useState } from 'react'

import './main.css'
import ThemeSwitcher from './components/ThemeSwitcher'
import Timer from './components/Timer'

function App() {

  const [timerStatus, setTimerstatus] = useState("idle");

  const handleTimerStatus = (status: string) => {
    setTimerstatus(status);
  }

  return (
    <>
      <div className='min-h-screen'>
        <div>
          <ThemeSwitcher/>
          
        </div>
        <div className='relative w-full'>
          <div className='absolute w-full left-0 top-50'>
            <div className='w-90 mx-auto'>
              <div className='flex flex-col justify-center gap-2 items-center'>
                <div>
                  <h1 className='text-4xl text-center'>Countdown Timer</h1>
                  <Timer status={timerStatus}/>

                </div>
                  {timerStatus == "idle" ?
                  <button onClick={() => handleTimerStatus("run")} className='timer-btn'>Start</button>
                  :
                  <div className='flex gap-2 w-full'>
                    <button onClick={() => handleTimerStatus("idle")} className='timer-btn'>Reset</button>
                    {timerStatus !== "paused" ? 
                      <button onClick={() => handleTimerStatus("paused")} className='timer-btn'>Pause</button>
                    : 
                      <button onClick={() => handleTimerStatus("run")} className='timer-btn'>Resume</button>
                    
                    }
                    
                  </div>
                  }


              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
