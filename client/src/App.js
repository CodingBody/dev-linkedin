import React from "react";
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./component/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import { loadUser } from "./actions/auth";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routing/PrivateRoute";
import CreateProfile from "./component/profile-forms/CreateProfile.jsx";
import EditProfile from "./component/profile-forms/EditProfile";
import AddExperience from "./component/profile-forms/AddExperience";
import AddEducation from "./component/profile-forms/AddEducation";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
// in order to do api get request to /api/auth

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
