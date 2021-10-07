import { Route, Redirect } from "react-router-dom"

import { useContext } from "react"
import { AuthContext } from "../AuthContext"

export default function PublicRoute({ component: Component, ...rest }) {
    const user = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        return !user ? <Component {...props} /> : <Redirect to="/user" />
      }}
    ></Route>
  )
}