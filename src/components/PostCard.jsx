import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage, content }) {
    const imageUrl = appwriteService
        .getFilePreview(featuredImage)
        .toString();

    const readingTime = Math.max(
        1,
        Math.ceil((content?.split(" ").length || 0) / 200)
    );

    return (
        <Link to={`/post/${$id}`} className="group">
            <article className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

                {/* Image */}
                <div className="relative overflow-hidden">

                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Reading time */}
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
                        📖 {readingTime} min read
                    </span>

                </div>

                {/* Content */}
                <div className="p-6">

                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                        InkFlow Story
                    </span>

                    <h2 className="mt-3 text-2xl font-bold text-slate-900 leading-tight transition-colors duration-300 group-hover:text-blue-600 line-clamp-2">
                        {title}
                    </h2>

                    <p className="mt-4 text-gray-500 line-clamp-3">
                        {content
                            ? content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
                            : "Read this amazing story on InkFlow."}
                    </p>

                    <div className="mt-6 flex items-center justify-between">

                        <span className="text-sm text-gray-400">
                            Published on InkFlow
                        </span>

                        <span className="font-semibold text-blue-600 transition-transform duration-300 group-hover:translate-x-2">
                            Read Article →
                        </span>

                    </div>

                </div>

            </article>
        </Link>
    );
}

export default PostCard;