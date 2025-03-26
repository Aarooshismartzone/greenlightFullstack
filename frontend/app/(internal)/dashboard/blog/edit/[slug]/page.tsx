"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import AddBlogComponent from "@/components/internal/blog/add-blog";

export default function EditBlogPost() {
    const { theme } = useTheme();
    const [isNightMode, setIsNightMode] = useState<boolean>(false);
    const [blogData, setBlogData] = useState<any>(null);
    const params = useParams();
    const { slug } = params; // Get the slug from the URL params

    useEffect(() => {
        setIsNightMode(theme === "light");
    }, [theme]);

    useEffect(() => {
        if (!slug) return;

        const fetchBlogPost = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/blogs/${slug}`, {
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setBlogData(data);
            } catch (error) {
                console.error("Error fetching blog post:", error);
            }
        };

        fetchBlogPost();
    }, [slug]);

    if (!blogData) return <p>Loading blog post details...</p>;

    return (
        <div className={isNightMode ? "bg-[#f1f5f9] min-h-[calc(100vh-64px)]" : "bg-[#1a222c] min-h-[calc(100vh-64px)]"}>
            <h1 className="text-2xl text-center py-3">Edit Blog Post</h1>
            {/* Pass blogData as props */}
            <AddBlogComponent blogData={blogData} isEditing={true} />
        </div>
    );
}
