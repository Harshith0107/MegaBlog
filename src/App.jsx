import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const userAuth = useSelector((state) => state.auth)

  useEffect (() => {
    setLoading(true)
    if(userAuth.status === true){
    authService.getCurrentUser().then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    } )
    .finally(()=> setLoading(false))
  } else {
    dispatch(logout())
    setLoading(false)
  }
}, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
        <h2 className='text-2xl font-bold text-center'>{userAuth.status === true ? ('Welcome, '+ userAuth.userData.name) : ''}</h2>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
