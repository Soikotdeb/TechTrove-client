import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Router/Router';
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <div className='px-1'>
    <RouterProvider router={router} />
    </div>
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>,
)
