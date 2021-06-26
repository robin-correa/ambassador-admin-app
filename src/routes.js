import { lazy } from "react";
import auth from "./services/auth";

const Dashboard = lazy(() => import("./pages/Dashboard/Index"));
const Users = lazy(() => import("./pages/Users/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const routes = [
  { path: "/", key: "dashboard", component: Dashboard, meta: { auth: true } },
  { path: "/users", key: "users", component: Users, meta: { auth: true } },
  { path: "/login", key: "login", component: Login },
  { path: "/register", key: "register", component: Register },
];

export const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (auth.getAccessToken()) {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};

export default routes;
