import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { AuthProvider } from "./AuthContext";

import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserPage from "./components/UserPage"
import Error from "./components/Error";
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute path="/signup" component={SignupPage}/>
          <PublicRoute path="/login" component={LoginPage}/>
          <PrivateRoute path="/user" component={UserPage}/>
          <Route component={Error}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}