import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Error, LogoutBtn } from './components/index.js'

import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import AddPost from "./pages/AddPost.jsx";
import Signup from './pages/Signup.jsx'
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import VerifyEmail from './components/VerifyEmail.jsx'
import EmailVerifySent from './components/EmailVerifySent.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: '/logout',
            element: (
              <AuthLayout authentication>
                {" "}
                <LogoutBtn />
              </AuthLayout>
            )
          },
          {
            path: "/post/:slug",
            element: (
              <AuthLayout authentication>
                {" "}
                <Post />
              </AuthLayout>
            ),
          },
          {
            path: '/verify-email',
            element: (
              <AuthLayout authentication>
                <VerifyEmail />
              </AuthLayout>
            )
          },
          {
            path: '/verify-email/status',
            element: (
              <AuthLayout authentication>
                <EmailVerifySent />
              </AuthLayout>
            )
          },
          {
            path: '*',
            element: <Error />,
          }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)