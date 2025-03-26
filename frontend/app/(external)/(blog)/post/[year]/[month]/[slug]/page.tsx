"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import "./post.scss";
import { Poppins } from "next/font/google";
import Postcontent from "@/components/blogposts/postcontent";
import { BlogPost } from "@/utils/interfaces";
import { backendUrl } from "@/components/primitives";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function Postpage() {
  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [blogpost, setBlogpost] = useState<BlogPost | null>(null);
  const { year, month, slug } = useParams();

  useEffect(() => {
    setIsNightMode(theme === "light");

    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/blogs/${slug}`);
        if (!response.ok) throw new Error("Blog post not found");

        const data: BlogPost = await response.json();

        // Convert timestamp to year, month, date
        const dateObj = new Date(data.createdAt);
        const formattedPost = {
          ...data,
          year: dateObj.getFullYear(),
          month: dateObj.toLocaleString("default", { month: "long" }), // "March"
          date: dateObj.getDate(),
        };

        setBlogpost(formattedPost);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, [theme, slug]);

  if (!blogpost) {
    return (
      <div>
        <h1>404 - Blog Post Not Found</h1>
        <p>The blog post you&apos;re looking for does not exist. Kindly check the link.</p>
      </div>
    );
  }

  return <Postcontent {...blogpost} />;
}
