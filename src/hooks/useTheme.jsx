import { useEffect, useState } from "react"

const useTheme = () => {
    const [theme, setTheme] = useState("dark");
    const nextTheme = theme === "dark" ? "light" : "dark";
    useEffect(() => {
        const rootElement  =  window.document.documentElement;
        rootElement.classList.remove(nextTheme);
        rootElement.classList.add(theme);
    }, [theme, nextTheme])
    
  return [nextTheme, setTheme]
}

export default useTheme