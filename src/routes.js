import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
//import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import UserList from "views/UserList.js";
import Auth from "views/Auth.js";
import NameList from "views/NameList.js";
import ArticleTabs from "views/ArticleTabs";
import BabyProfile from "views/BabyProfile";
import Products from "views/Products";
import ValiseMaternite from "views/ValiseMaternite";
import Categories from "views/Categories";
//import Login from "views/Login";
import Icons from "./views/Icons";

var routes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "nc-icon nc-tile-56",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Produits",
    icon: "nc-icon nc-bag-16",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/categorie",
    name: "Catégories",
    icon: "nc-icon nc-bullet-list-67",
    component: Categories,
    layout: "/admin",
  },

  {
    path: "/valisematernite",
    name: "Valise Maternite",
    icon: "nc-icon nc-cart-simple",
    component: ValiseMaternite,
    layout: "/admin",
  },

  {
    path: "/tables",
    name: "Listes d'utilisateurs",
    icon: "nc-icon nc-badge",
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/nameList",
    name: "Liste des nom",
    icon: "nc-icon nc-bullet-list-67",
    component: NameList,
    layout: "/admin",
  },
  {
    path: "/babydev",
    name: "Profile bébé",
    icon: "nc-icon nc-satisfied",
    component: BabyProfile,
    layout: "/admin",
  },
  {
    path: "/articles",
    name: "Articles",
    icon: "nc-icon nc-paper",
    component: ArticleTabs,
    layout: "/admin",
  },

  {
    path: "/products",
    name: "Produits",
    icon: "nc-icon nc-bag-16",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/categorie",
    name: "Catégories",
    icon: "nc-icon nc-bullet-list-67",
    component: Categories,
    layout: "/admin",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },

  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // },
];
export default routes;
