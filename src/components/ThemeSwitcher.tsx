import {useEffect, useState} from 'react';
import { Sun, Moon } from 'lucide-react';
export default function ThemeSwitcher(){

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    })

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");

    }

    return(
        
        <button onClick={changeTheme} className='p-2 hover:bg-white-2 rounded-full dark:hover:bg-dark-2'>
            {theme === "light" ? <Sun/> : <Moon/>}
        </button>

    )
}