import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutHandler = async () => {
    await authService.logout();

    dispatch(logout());

    navigate("/", { replace: true });
}
  return (
    <button
    onClick={logoutHandler}
    className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition duration-300 shadow"
>
    Logout
</button>
  )
}

export default LogoutBtn