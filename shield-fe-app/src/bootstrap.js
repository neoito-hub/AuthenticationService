import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'

const Index = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
ReactDOM.render(<Index />, document.getElementById('root'))
