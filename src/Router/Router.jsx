import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import NotFoundPage from "../Pages/Shared/NotFoundPage/NotFoundPage";
import LogIn from "../Pages/Shared/LogIn/LogIn";
import Registration from "../Pages/Shared/Registration/Registration";
import TermsCondition from "../TermsCondition/TermsCondition";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AskedQuestions from "../Pages/AskedQuestions/AskedQuestions";




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
  },
  {
path:'terms',
element:<TermsCondition></TermsCondition>
  },
  {
    path:'contactUs',
    element:<ContactUs></ContactUs>
  },
  {
    path:'AskedQuestions',
    element:<AskedQuestions></AskedQuestions>
  }
  ]);