import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin({ userData }));

                    toast.success(`Welcome back, ${userData.name}!`);
                }

                navigate("/");
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">

            <div className="text-center mb-8">

                <div className="text-5xl mb-3">👋</div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome Back
                </h1>

                <p className="text-gray-500 mt-2">
                    Login to continue your blogging journey.
                </p>

            </div>

            {error && (
                <div className="mb-5 rounded-xl bg-red-100 text-red-700 px-4 py-3">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit(login)}
                className="space-y-6"
            >
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                    })}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                />

                <Button
                    type="submit"
                    className="w-full"
                >
                    Sign In
                </Button>
            </form>

            <p className="mt-8 text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Create one
                </Link>
            </p>

        </div>

    </div>
);
}

export default Login