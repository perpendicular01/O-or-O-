import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';

import AuthProvider from './providers/AuthProvider';
import { ToastContainer } from 'react-toastify';


import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <div className='mx-auto max-w-screen-xl'>
            <RouterProvider router={router} />
          </div>
          <ToastContainer></ToastContainer>
      </QueryClientProvider>

    </AuthProvider>




  </StrictMode>,
)