import { AppProps } from "next/app";
import "../styles/global.css"

export default function App({ Component, pageProps }: AppProps) {
  return 
  <>
    <title>NLW Copa 2022</title>
    <Component {...pageProps} />
  </>
}   