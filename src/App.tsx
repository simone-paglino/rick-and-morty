import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouterApp from './components/pages/routes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  )
}

export default App
