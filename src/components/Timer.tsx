import { useEffect, useRef, useState } from "react"
import {Clock} from "lucide-react";

interface TimerProps{
    status: String;
}

export default function Timer({status} : TimerProps){

    const [timer, setTimer] = useState(0);
    const [editTimer, setEditTimer] = useState(false);
    const [display, setDisplay] = useState("00:00:00");

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

    const parseTime = (str: string) => {
        const [h, m, s] = str.split(":").map(Number);
        return h * 3600 + m * 60 + s;
    };

    useEffect(() => {
        if (myRef.current) {
          const len = myRef.current.value.length;
          myRef.current.setSelectionRange(len, len);
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
          e.preventDefault();
          shiftLeft();
        } else if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          shiftRight(e.key);
        }
      };

      const shiftRight = (digit: string) => {
        const digits = display.replace(/:/g, "").split(""); // get raw 6 digits
        digits.push(digit);
        while (digits.length > 6) digits.shift(); // keep only last 6
        updateDisplayFromDigits(digits);
      };

      const shiftLeft = () => {
        const digits = display.replace(/:/g, "").split("");
        digits.pop();
        while (digits.length < 6) digits.unshift("0");
        updateDisplayFromDigits(digits);
      };

      const updateDisplayFromDigits = (digits: string[]) => {
        const formatted = `${digits[0]}${digits[1]}:${digits[2]}${digits[3]}:${digits[4]}${digits[5]}`;
        setDisplay(formatted);
        setTimer(parseTime(formatted));
      };

      const handleBlur = () => {
        setDisplay(formatTime(timer));
      };


    const formatTime = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / 3600);
        const minutes = Math.floor((milliseconds % 3600) / 60);
        const seconds = milliseconds % 60;
    
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };
    return(
        <>
            <h1 onClick={() => setEditTimer(true)} className={`${editTimer ? "hidden" : "inline-block"} text-8xl text-center`}>
                {formatTime(timer)}
            </h1>
            
            {editTimer && <input  value={display} onKeyDown={handleKeyDown} onBlur={handleBlur} readOnly ref={myRef} className="text-8xl text-dark-4 w-100 text-center focus:outline-0 " placeholder="00:00:00"/>}
        </>

    )

}

