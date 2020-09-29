import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Cookies from "universal-cookie";
import Auth from "./views/Auth";
import AdminLayout from "layouts/Admin.js";
import routes from "./routes";
const cookies = new Cookies();

const hist = createBrowserHistory();

const userCookies = cookies.get("userCookies");

const PrivateRoute = ({ component, isAuthenticated, path }) => {
  return isAuthenticated ? (
    <Route component={component} path={path} />
  ) : (
    <Redirect
      to={{
        pathname: "/Login",
      }}
    />
  );
};

ReactDOM.render(
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
  </Router>,
  document.getElementById("root")
);

// import React from "react";
// import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.css";
// import "assets/scss/paper-dashboard.scss?v=1.2.0";
// import "assets/demo/demo.css";
// import "perfect-scrollbar/css/perfect-scrollbar.css";

// import AdminLayout from "layouts/Admin.js";

// const hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Redirect exact from="/" to="/admin/dashboard" />

//       <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );
