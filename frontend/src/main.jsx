/* eslint-disable no-unused-vars */
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './Components/context/AuthContext'
import Layout from './Layout'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Notes from './Components/Notes/Notes'
import PYQComponent from './Components/QuestionPaper/PYQComponent'
import BooksPage from './Components/Book/BookPage'
import Feedback from './Components/Feedback/Feedback'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: '/',
//         element: <Home/>,
//       },
//       {
//         path: 'about',
//         element: <About/>,
//       },
//       {
//         path: 'contact',
//         element: <Contact/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='about' element={<About />}/>
      <Route path='contact' element={<Contact />}/>
      <Route path='notes' element={<Notes />}/>
      <Route path='question-papers' element={<PYQComponent />}/>
      <Route path='books' element={<BooksPage />}/>
      <Route path='feedback' element={<Feedback />}/>
      
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
