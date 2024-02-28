import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdSupport,
  MdHome,
  MdSource,
  MdHelp,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "./views/admin/default";

// Auth Imports
// import SignInCentered from "./views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Support",
    layout: "/admin",
    path: "/support",
    icon: <Icon as={MdSupport} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Plugins",
    layout: "/admin",
    path: "/plugins",
    icon: <Icon as={MdSource} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Help",
    layout: "/admin",
    path: "/help",
    icon: <Icon as={MdHelp} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // },

];

export default routes;
