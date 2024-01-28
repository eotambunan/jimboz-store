import '@/styles/globals.css'
import AppShell from "@/components/layouts/AppShell"
import { useEffect } from 'react'
import useSnap from '../../utils/midtrans.utils'

export default function App({ Component, pageProps }) {

  useEffect(()=>{
    useSnap()
  },[])
  
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  )
}
