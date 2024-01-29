import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { shield } from '@appblocks/js-sdk'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const checkValidity = async () => {
      const result = await shield.validateAccessToken()
      setIsAuthenticated(result)
    }
    checkValidity()
  }, [])

  if (isAuthenticated === null) {
    return <div />
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
