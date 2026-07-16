import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                px-5
                py-3
                rounded-xl
                font-semibold
                shadow-md
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-xl
                active:scale-95
                ${bgColor}
                ${textColor}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}