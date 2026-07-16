import React, {useState} from 'react'
import authService from '../appwrite/auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const account = await authService.createAccount(data)
            if (account) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login({ userData }));

                    toast.success("Welcome to InkFlow! 🎉");
                }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-100 px-4">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">

            <div className="text-center mb-8">

                <div className="text-5xl mb-3">🚀</div>

                <h1 className="text-3xl font-bold text-gray-800">
                    Create Account
                </h1>

                <p className="text-gray-500 mt-2">
                    Join Blogify and start sharing your ideas.
                </p>

            </div>

            {error && (
                <div className="mb-5 rounded-xl bg-red-100 text-red-700 px-4 py-3">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit(create)}
                className="space-y-5"
            >

                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    {...register("name", { required: true })}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Choose a password"
                    {...register("password", { required: true })}
                />

                <Button
                    type="submit"
                    className="w-full"
                >
                    Create Account
                </Button>

            </form>

            <p className="mt-8 text-center text-gray-600">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Sign In
                </Link>
            </p>

        </div>

    </div>
);
}

export default Signup