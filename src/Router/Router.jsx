import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import NotFoundPage from "../Pages/Shared/NotFoundPage/NotFoundPage";
import LogIn from "../Pages/Shared/LogIn/LogIn";
import Registration from "../Pages/Shared/Registration/Registration";




export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<NotFoundPage></NotFoundPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
      
      ]
    },
  {
    path:"logIn",
    element:<LogIn></LogIn>
  },
  {
    path:'registration',
    element:<Registration></Registration>
  }
  ]);