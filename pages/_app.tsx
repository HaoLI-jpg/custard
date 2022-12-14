import '../styles/globals.css'
import Navbar from '../components/Navbar'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
