import React, { lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../helpers/utils'

// export const Layout = ({ children }) => {
//   return (
//     <>
//       <p>Hello World Layout </p>
//       {children}
//     </>
//   )
// }

const PrivateOutlet = ({ redirect }) => {
  const auth = isLoggedIn()
  return auth ? <Outlet /> : <Navigate to={redirect} />
}

export default PrivateOutlet
