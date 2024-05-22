import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { SWRConfig } from 'swr'
import App from './App'

const config = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  throwOnError: false,
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(
  <React.StrictMode>
    <SWRConfig value={config}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
)
