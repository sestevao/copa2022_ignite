import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts
} from "@expo-google-fonts/roboto"

import { NativeBaseProvider, StatusBar } from "native-base"

import { AuthContextProvider } from "./src/contexts/AuthContext"

import { THEME } from "./src/styles/theme"

import { Loading } from "./src/components/Loading"

import { Routes } from "./src/routes"

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })
 
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {fontsLoaded ? <Routes /> : <Loading />}
        
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}