import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b">
            <Container>
                <nav className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-extrabold text-blue-600 tracking-wide"
                    >
                        InkFlow
                    </Link>

                    {/* Navigation */}
                    <ul className="flex items-center gap-3">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className={`px-5 py-2 rounded-lg transition-all duration-300 font-medium
                                            ${
                                                location.pathname === item.slug
                                                    ? "bg-blue-600 text-white shadow"
                                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;