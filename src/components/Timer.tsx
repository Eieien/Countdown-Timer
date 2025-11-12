import { useEffect, useRef, useState } from "react"
import {Clock} from "lucide-react";

interface TimerProps{
    status: String;
}

export default function Timer({status} : TimerProps){

    const [timer, setTimer] = useState(69);
    const [editTimer, setEditTimer] = useState(false);
    const [running, setRunning] = useState(false);

    const myRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: React.MouseEvent<HTMLButtonElement>) => {
          // Check if the click occurred outside the referenced element
          if (myRef.current && !myRef.current.contains(event.target)) {
              setEditTimer(false);
            } 
        };
        // Attach the event listener to the document body
        document.body.addEventListener('mousedown', handleClickOutside);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.body.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        if(timer <= 0) return;
        setRunning(true);
        const myInterval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => clearInterval(myInterval);
    }, [timer])

    const handleTimer = (event: React.InputEvent<HTMLInputElement>) => {
        setTimer(event.target.value);
    };

    const formatTime = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / 3600);
        const minutes = Math.floor((milliseconds % 3600) / 60);
        const seconds = milliseconds % 60;
    
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };
    return(
        <>
            <h1 onDoubleClick={() => setEditTimer(true)} className={`${editTimer ? "hidden" : "inline-block"} text-8xl text-center`}>
                {formatTime(timer)}
            </h1>
            
            {editTimer && <input onChange={handleTimer} value={timer} ref={myRef} className="text-8xl w-100 text-center" placeholder="00:00:00"/>}
        </>

    )

}

