import { Tabs } from "expo-router";
import { ThemeProvider } from '../../context/ThemeContext'


export default function MainLayout() {
  return(
    <ThemeProvider>
        <Tabs>
            <Tabs.Screen name="index"/>
            <Tabs.Screen name="profile"/>
            <Tabs.Screen name="settings"/>
        </Tabs>
    </ThemeProvider>
    
  )
} 