import web from "./web";
import ErrorPage from "../pages/error";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import { ReactNode } from "react";

interface Props {
    // path 属性是必需的，且为 string (对应你的 web.* 常量)
    path: string; 
    
    // element 属性是必需的，且为 ReactNode (对应你的组件)
    element: ReactNode; 
}

const routes: Props[] = [
    { path: web.any, element: <ErrorPage /> },
    { path: web.home, element: <HomePage /> },
    { path: web.login, element: <LoginPage /> }
];

export default routes;
