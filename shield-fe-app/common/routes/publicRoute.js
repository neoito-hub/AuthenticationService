import React from 'react'
import { Route } from 'react-router-dom'

function PublicRoute({ component: Component }) {
  return <Route render={() => <Component />} />
}

export default PublicRoute
