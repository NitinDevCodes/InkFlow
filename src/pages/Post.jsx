import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData
        ? post.userId === userData.$id
        : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this article?"
        );

        if (!confirmDelete) return;

        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                toast.success("Story deleted successfully!");
                navigate("/");
            }
        });
    };

    const readingTime = Math.max(
        1,
        Math.ceil(
            post?.content.replace(/<[^>]+>/g, "").split(" ").length / 200
        )
    );

    return post ? (
        <div className="bg-slate-50 py-12 min-h-screen">

            <Container>

                {/* Hero Image */}

                <div className="relative overflow-hidden rounded-3xl shadow-2xl">

                    <img
                        src={appwriteService
                            .getFilePreview(post.featuredImage)
                            .toString()}
                        alt={post.title}
                        className="w-full h-[500px] object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-10 left-10 text-white">

                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">

                            📖 {readingTime} min read

                        </span>

                        <h1 className="text-5xl font-extrabold mt-5 max-w-4xl leading-tight">

                            {post.title}

                        </h1>

                    </div>

                    {isAuthor && (
                        <div className="absolute top-6 right-6 flex gap-3">

                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-600">
                                    ✏ Edit
                                </Button>
                            </Link>

                            <Button
                                bgColor="bg-red-600"
                                onClick={deletePost}
                            >
                                🗑 Delete
                            </Button>

                        </div>
                    )}

                </div>

                {/* Article */}

                <div className="max-w-4xl mx-auto mt-12">

                    <div className="flex items-center justify-between border-b pb-6 mb-10">

                        <div>

                            <p className="text-xl font-semibold text-slate-800">

                                InkFlow Author

                            </p>

                            <p className="text-gray-500 mt-1">

                                Published on InkFlow

                            </p>

                        </div>

                        <div className="text-right">

                            <p className="font-semibold text-blue-600">

                                {readingTime} min read

                            </p>

                            <p className="text-gray-500">

                                Happy Reading 📚

                            </p>

                        </div>

                    </div>

                    <article className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-8 prose-img:rounded-2xl">

                        {parse(post.content)}

                    </article>

                </div>

            </Container>

        </div>
    ) : null;
}