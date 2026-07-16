import React, { useId } from "react";

function Select(
    {
        options,
        label,
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

            <select
                {...props}
                id={id}
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
                    ${className}
                `}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);