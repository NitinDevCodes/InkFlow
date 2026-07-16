import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <Container>

                <div className="text-center mb-12">

                    <h1 className="text-4xl font-bold text-slate-800">
                        📚 Explore Articles
                    </h1>

                    <p className="text-slate-500 mt-3">
                        Read stories shared by our community.
                    </p>

                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-24">

                        <h2 className="text-2xl font-semibold text-gray-700">
                            No Posts Found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Be the first one to publish a story.
                        </p>

                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {posts.map((post) => (
                            <PostCard
                                key={post.$id}
                                {...post}
                            />
                        ))}

                    </div>
                )}

            </Container>
        </div>
    );
}

export default AllPosts;