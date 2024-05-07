import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import { useDispatch, useSelector } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'
import { BackgroundGradient } from './ui/background-gradient'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")


    const authSlice = useSelector((state) => state.auth)
    console.log('authSlice: (in Login component(in components/Login.jsx)) ', authSlice)

    const login = async(data) => {
        setError("")
        try{
                //  this.account.deleteSession('current')
                const session = await authService.login(data)
                
                if(session){
                    console.log('Login Successfull !')

                    const userData = await authService.getCurrentUser()

                    if(userData){ 
                        console.log('userData: (in Login component(in components/Login.jsx)) ', userData)
                        dispatch(authLogin({userData}))

                        navigate("/")
                }
            }
        }
        catch(error){
                setError(error.message)
                console.log('Login error: ', error)
        }

    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-zinc-800"
        >
        <div className={`mx-auto w-full max-w-lg rounded-xl p-10 border border-black/10 text-white`}>
        <div className="mb-2 flex justify-center">

                    <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}
                    </span>
        </div>
        
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base ">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
        </BackgroundGradient>
    </div>
  )
}

export default Login
