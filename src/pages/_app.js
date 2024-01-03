import '@/styles/globals.css'
import AppShell from "@/components/layouts/AppShell"

export default function App({ Component, pageProps }) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  )
}
