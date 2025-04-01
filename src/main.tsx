// O ficheiro main.tsx tem a função de renderizar 
// o componente <App /> e inserir através da DOM do HTML pelo id root.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider} from "react-router-dom" // chamar as rotas
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={ router }/>
  </StrictMode>,
)
