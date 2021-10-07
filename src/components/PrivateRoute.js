import { Route, Redirect } from "react-router-dom"

import { useContext } from "react"
import { AuthContext } from "../AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
    const user = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}