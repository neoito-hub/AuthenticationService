import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { shield } from '@appblocks/js-sdk'
import AppRoute from '../common/routes/appRoute'
import FallbackUI from '../common/fallbackUI/fallbackUI'
import Layout from './components/layout/layout'
import './assets/css/main.scss'

const App = () => {
  const [first, setFirst] = useState(false)
  useEffect(async () => {
    await shield.init(process.env.CLIENT_ID)
    await shield.verifyLoginWithoutRedirect()
    setFirst((x) => !x)
  }, [])

  const handleError = (error, errorInfo) => {
    console.log('Error occured in ', errorInfo.componentStack.split(' ')[5])
  }

  return (
    <ErrorBoundary FallbackComponent={FallbackUI} onError={handleError}>
      <div className="App">
        <Layout>
          <AppRoute />
        </Layout>
      </div>
    </ErrorBoundary>
  )
}

export default App
