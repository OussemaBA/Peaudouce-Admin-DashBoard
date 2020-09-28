import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
//import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import UserList from "views/UserList.js";
import UserPage from "views/User.js";
import NameList from "views/NameList.js";
import ArticleTabs from "views/ArticleTabs";
import BabyProfile from "views/BabyProfile";
import Products from "views/Products";
import ValiseMaternite from "views/ValiseMaternite";
import Categories from "views/Categories";
var routes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Produits",
    icon: "nc-icon nc-tile-56",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/categorie",
    name: "Catégories",
    icon: "nc-icon nc-tile-56",
    component: Categories,
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
    name: "Listes d'utilisateurs",
    icon: "nc-icon nc-tile-56",
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/nameList",
    name: "Liste des nom",
    icon: "nc-icon nc-diamond",
    component: NameList,
    layout: "/admin",
  },
  {
    path: "/babydev",
    name: "Profile bébé",
    icon: "nc-icon nc-tile-56",
    component: BabyProfile,
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
