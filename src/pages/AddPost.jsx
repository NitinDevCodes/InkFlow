import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
    return (
        <div className="py-12 bg-slate-50 min-h-screen">
            <Container>

                <div className="max-w-5xl mx-auto">

                    <div className="mb-10 text-center">

                        <h1 className="text-4xl font-bold text-slate-800">
                            ✍️ Write a New Story
                        </h1>

                        <p className="text-slate-500 mt-3">
                            Share your thoughts with the world.
                        </p>

                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-8">

                        <PostForm />

                    </div>

                </div>

            </Container>
        </div>
    );
}

export default AddPost;