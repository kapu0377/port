import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '1.5rem' }}>페이지 로딩 중...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
