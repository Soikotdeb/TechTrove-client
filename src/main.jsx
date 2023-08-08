import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Router/Router';
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <div className='px-1'>
    <RouterProvider router={router} />
    </div>
    </QueryClientProvider>
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>,
)
