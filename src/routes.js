import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import UserList from "views/UserList.js";
import UserPage from "views/User.js";
import NameList from "views/NameList.js";
import ArticleTabs from "views/ArticleTabs";
import BabyDevelopment from "views/BabyDevelopment";
import Products from "views/Products";
import ValiseMaternite from "views/ValiseMaternite";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-tile-56",
    component: Products,
    layout: "/admin",
  },

  {
    path: "/valisematernite",
    name: "Valise Maternite",
    icon: "nc-icon nc-tile-56",
    component: ValiseMaternite,
    layout: "/admin",
  },

  {
    path: "/tables",
    name: "User Lists",
    icon: "nc-icon nc-tile-56",
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/nameList",
    name: "Name List",
    icon: "nc-icon nc-diamond",
    component: NameList,
    layout: "/admin",
  },
  {
    path: "/babydev",
    name: "Baby Dev",
    icon: "nc-icon nc-tile-56",
    component: BabyDevelopment,
    layout: "/admin",
  },
  {
    path: "/articles",
    name: "Articles",
    icon: "nc-icon nc-pin-3",
    component: ArticleTabs,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },

  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
  },
];
export default routes;