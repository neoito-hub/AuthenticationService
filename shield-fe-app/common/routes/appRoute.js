import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute'
import Dashboard from '../../src/components/DashBoard'

const PageNotFound = () => <>Page Not Found</>

const AppRoute = () => (
  <Suspense fallback="">
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/*" component={PageNotFound} />
    </Switch>
  </Suspense>
)

export default AppRoute
