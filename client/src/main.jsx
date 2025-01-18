import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PrivyProvider } from '@privy-io/react-auth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId="cm5xy3xab04ghfmtt1pcm83v2"
      config={{
        loginMethods: ['email','wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://swiftnet.ai/logo.png',
          walletList:['phantom']
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>,
)