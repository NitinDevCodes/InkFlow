import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                toast.success("Story published successfully!");

                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (!file) {
                toast.error("Image upload failed.");
                return;
            }

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    toast.success("Story updated successfully! ✨");

                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
    <form
        onSubmit={handleSubmit(submit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
        {/* Left Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

            <h2 className="text-3xl font-bold text-slate-800 mb-2">
                ✍️ Write Your Story
            </h2>

            <p className="text-gray-500 mb-8">
                Share your thoughts with the world.
            </p>

            <Input
                label="Title"
                placeholder="Enter your blog title..."
                className="mb-6"
                {...register("title", { required: true })}
            />

            <Input
                label="Slug"
                placeholder="your-blog-title"
                className="mb-6"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue(
                        "slug",
                        slugTransform(e.currentTarget.value),
                        { shouldValidate: true }
                    );
                }}
            />

            <div className="mt-8">
                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 h-fit sticky top-24">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                🚀 Publish
            </h2>

            <Input
                label="Featured Image"
                type="file"
                className="mb-6"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />

            {post && (
                <div className="mb-6">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-2xl shadow-md w-full object-cover"
                    />
                </div>
            )}

            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-6"
                {...register("status", { required: true })}
            />

            <Button
                type="submit"
                bgColor={post ? "bg-green-600" : "bg-blue-600"}
                className="w-full"
            >
                {post ? "Update Article" : "Publish Article"}
            </Button>
        </div>
    </form>
);
}