import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-semibold text-gray-700"
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                type={type}
                ref={ref}
                className={`
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    text-gray-900
                    shadow-sm
                    outline-none
                    transition
                    duration-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    placeholder:text-gray-400
                    ${className}
                `}
                {...props}
            />
        </div>
    );
});

export default Input;