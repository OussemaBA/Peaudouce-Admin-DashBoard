import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { FirebaseAppProvider } from "reactfire";
import Cookies from "universal-cookie";
import Auth from "./views/Auth";
import AdminLayout from "layouts/Admin.js";
import routes from "./routes";
const cookies = new Cookies();

const hist = createBrowserHistory();
const firebaseConfig = {
  apiKey: "AIzaSyDr3KYRwAE1wKHPz07EeFEr6aJv8ZlDur8",
  authDomain: "adminlte-7a511.firebaseapp.com",
  databaseURL: "https://adminlte-7a511.firebaseio.com",
  projectId: "adminlte-7a511",
  storageBucket: "adminlte-7a511.appspot.com",
  messagingSenderId: "257044269234",
  appId: "1:257044269234:web:6187d0cd7b9f7471e721ab",
};
const userCookies = cookies.get("userCookies");

const PrivateRoute = ({ component, isAuthenticated, path, ...props }) => {
  return isAuthenticated ? (
    <Route component={component} path={path} {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/Login",
      }}
    />
  );
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Router history={hist}>
      <Switch>
        {routes.map((el) => (
          <PrivateRoute
            component={el.component}
            path={el.path}
            isAuthenticated={userCookies}
          />
        ))}

        {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}

        <Route path="/Login" component={Auth} />

        {/* <Redirect to="/admin/dashboard" /> */}
      </Switch>
    </Router>
  </FirebaseAppProvider>,
  document.getElementById("root")
);
