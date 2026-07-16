import React from "react";

function Logo({ width = "150px" }) {
    return (
        <div
            style={{ width }}
            className="flex items-center gap-2 select-none"
        >
            <span className="text-3xl">🖋️</span>

            <div className="flex flex-col leading-none">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    InkFlow
                </span>

                <span className="text-[10px] text-gray-500 tracking-[3px] uppercase">
                    Write • Inspire
                </span>
            </div>
        </div>
    );
}

export default Logo;