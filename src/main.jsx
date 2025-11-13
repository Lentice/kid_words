import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './routes/App.jsx'
import Learn from './routes/Learn.jsx'
import Quiz from './routes/Quiz.jsx'
import './styles/main.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Learn /> },
      { path: 'learn', element: <Learn /> },
      { path: 'quiz', element: <Quiz /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
