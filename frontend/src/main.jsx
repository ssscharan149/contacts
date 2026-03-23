import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ContactDetailsPage from './pages/ContactDetailsPage.jsx'
import ContactsListPage from './pages/ContactsListPage.jsx'
import NewContactPage from './pages/NewContactPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/contacts" replace />,
      },
      {
        path: 'contacts',
        element: <ContactsListPage />,
      },
      {
        path: 'contacts/new',
        element: <NewContactPage />,
      },
      {
        path: 'contacts/:id',
        element: <ContactDetailsPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
