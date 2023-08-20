import {createBrowserRouter,} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import NotFoundPage from "../Pages/Shared/NotFoundPage/NotFoundPage";
import LogIn from "../Pages/Shared/LogIn/LogIn";
import Registration from "../Pages/Shared/Registration/Registration";
import TermsCondition from "../TermsCondition/TermsCondition";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AskedQuestions from "../Pages/AskedQuestions/AskedQuestions";
import Dashboard from "../Pages/Shared/Dashboard/Dashboard";
import WelcomePage from "../Pages/Dashboard/WelcomePage";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import AddProducts from "../Pages/Dashboard/AddProducts";
import MyAddedProducts from "../Pages/Dashboard/MyAddedProducts";
import UsersQuestions from "../Pages/Dashboard/UsersQuestions";
import UsersFeedback from "../Pages/Dashboard/UsersFeedback";
import NewOfferDetails from "../Pages/NewOffer/NewOfferDetails";




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
  {
    path:"logIn",
    element:<LogIn></LogIn>
  },
  {
    path: 'fullDetails/:id',
    element: <NewOfferDetails />, 
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
  },
{
  path:'dashboard',
  element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
  children:[
    {
      path:'welcome',
      element:<PrivateRoute><WelcomePage></WelcomePage></PrivateRoute>
    },
    {
      path:'ManageUsers',
      element:<PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
    },
    {
      path:'AddProducts',
      element:<PrivateRoute><AddProducts></AddProducts></PrivateRoute>
    },
    {
      path:'MyAddedProducts',
      element:<PrivateRoute><MyAddedProducts></MyAddedProducts></PrivateRoute>
    },
    {
      path:'usersQuestions',
      element:<PrivateRoute><UsersQuestions></UsersQuestions></PrivateRoute>
    },
    {
      path:'usersFeedback',
      element:<PrivateRoute><UsersFeedback></UsersFeedback></PrivateRoute>
    }
  ]
}
  ]);