import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes/routes'
import { useSelector } from 'react-redux'
import { RootState } from './redux'

function App() {
  const token = useSelector((state: RootState) => state.auth.token)
  const routes = useRoutes(!!token)

  return (
    <BrowserRouter>
      <div className="App">{routes}</div>
    </BrowserRouter>
  )
}

export default App
