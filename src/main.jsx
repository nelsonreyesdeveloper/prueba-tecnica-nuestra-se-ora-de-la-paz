import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import router from './router.jsx';
import { RouterProvider } from "react-router-dom";
import MedicamentosProvider from './context/MedicamentosProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <MedicamentosProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MedicamentosProvider>
  ,
)
