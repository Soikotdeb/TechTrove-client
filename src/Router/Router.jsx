import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import NotFoundPage from "../Pages/Shared/NotFoundPage/NotFoundPage";




export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<NotFoundPage></NotFoundPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        }
      ]
    },
  ]);