import { createContext, useState, } from "react";

type Theme = 'light' | 'dark';

export const ThemeContext = createContext({
    theme: 'Theme',
    toggleTheme: () => {} 
})

export const ThemeProvider = ({children} : {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<Theme>('light');
     
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    return(
        <ThemeContext.Provider value={{ theme , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}