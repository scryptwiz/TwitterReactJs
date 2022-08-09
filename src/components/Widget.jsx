import { MoonIcon, SearchIcon, SunIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Widget = () => {
    const [toggle, setToggle] = useState(false)
    const userTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const themeSwitch = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem('theme', "light")
            setToggle(false)
            return;
        }
        document.documentElement.classList.remove("dark");
        localStorage.setItem('theme', "dark")
        setToggle(true)
    }
    
    useEffect(() => {
        const themeCheck = () =>{
            if (userTheme === "dark" || (!userTheme && systemTheme)) {
                document.documentElement.classList.add("dark")
                setToggle(true)
                return;
            }
            setToggle(false)
        }
        themeCheck()
    }, [systemTheme, userTheme])
    

  return (
    <div className="col-span-2 hidden lg:inline mt-3 px-2">
        {/* Search */}
        <div className="flex w-full">
            <span className="ml-auto">
                {toggle?<SunIcon onClick={themeSwitch} className="w-5 h-5 text-gray-400"/>:<MoonIcon onClick={themeSwitch} className="w-5 h-5 text-gray-400"/>}
            </span>
        </div>
        <div className="flex items-center bg-gray-300 dark:bg-gray-200 dark:bg-opacity-10 rounded-full px-3 py-1.5 my-2">
            <SearchIcon className="w-4 h-4 text-gray-400"/>
            <input type="text" placeholder="Search Twitter" className="w-full ml-2 outline-none bg-transparent"/>
        </div>
        {/* timeline */}
        <TwitterTimelineEmbed sourceType="profile" screenName="twitter" options={{height: 600}} />
    </div>
  )
}

export default Widget