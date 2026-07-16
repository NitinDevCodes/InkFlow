import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="bg-slate-50">

            {/* Hero Section */}
            <section className="py-24">

                <Container>

                    <div className="max-w-4xl mx-auto text-center">

                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
                            🖋 Welcome to InkFlow
                        </span>

                        <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">

                            Where Great
                            <span className="text-blue-600"> Stories </span>
                            Begin.

                        </h1>

                        <p className="mt-8 text-xl text-slate-600 leading-9">

                            Share your ideas, publish beautiful blogs,
                            and discover stories from creators all over
                            the world.

                        </p>

                        <div className="flex justify-center gap-5 mt-12">

                            <Link
                                to={authStatus ? "/add-post" : "/signup"}
                                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg duration-300 hover:scale-105"
                            >
                                {authStatus ? "✍ Start Writing" : "🚀 Get Started"}
                            </Link>

                            <Link
                                to="/all-posts"
                                className="px-8 py-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-300"
                            >
                                📚 Explore Stories
                            </Link>

                        </div>

                    </div>

                </Container>

            </section>

            {/* Posts Section */}

            <section className="pb-20">

                <Container>

                    <div className="text-center mb-14">

                        <h2 className="text-4xl font-bold text-slate-900">
                            🔥 Latest Stories
                        </h2>

                        <p className="text-slate-500 mt-3 text-lg">
                            Fresh ideas from our amazing community.
                        </p>

                    </div>

                    {posts.length === 0 ? (

                        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

                            <div className="text-7xl mb-6">
                                🚀
                            </div>

                            <h2 className="text-3xl font-bold text-slate-800">
                                Be the First Author
                            </h2>

                            <p className="text-slate-500 mt-4 mb-8">

                                No stories have been published yet.
                                Start writing and inspire the world.

                            </p>

                            <Link
                                to="/add-post"
                                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 duration-300"
                            >
                                Publish First Story
                            </Link>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                            {posts.map((post) => (

                                <PostCard
                                    key={post.$id}
                                    {...post}
                                />

                            ))}

                        </div>

                    )}

                </Container>

            </section>

        </div>
    );
}

export default Home;