"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import "./blog.scss";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Footerpage from "@/components/footer/footerpage";
import { BlogPost } from "@/utils/interfaces";
import { backendUrl } from "@/components/primitives";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function Blogpage() {
  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState(false);
  const [blogposts, setBlogposts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setIsNightMode(theme === "light");

    // Fetch blog posts from backend
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/blogs`);
        const data: BlogPost[] = await response.json();

        // Convert timestamps to year, month, date
        const formattedData = data.map((post) => {
          const dateObj = new Date(post.createdAt);
          return {
            ...post,
            year: dateObj.getFullYear(),
            month: dateObj.toLocaleString("default", { month: "long" }), // "March"
            date: dateObj.getDate(),
          };
        });
        setBlogposts(formattedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [theme]);

  if (!blogposts.length) {
    return <div className="text-center py-10">Loading blogs...</div>;
  }

  return (
    <>
      <div className="color-divider-left"></div>
      <div className="banner-background">
        <div className={!isNightMode ? `bg-[#000000dd] py-10` : `bg-[#ffffff50] py-10`}>
          <div className="lg:text-5xl md:text-4xl sm:text-2xl text-xl text-center font-bold">Blog</div>
        </div>
      </div>
      <div className="color-divider-right"></div>
      <div className="main-section-blog">
        <div className={!isNightMode ? `bg-[#000000ed] py-4` : `bg-[#ffffffc9] py-4`}>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 ${poppins.className}`}>
            <div className="grid xl:grid-cols-2 grid-cols-1">
              <div className="col-span-1 p-1">
                <Blogcard {...blogposts[0]} isLatest={true} />
              </div>
              <div className="col-span-1 p-1">
                <div className="grid md:grid-cols-2 grid-cols-1">
                  {blogposts.slice(1, 5).map((blog, index) => (
                    <div key={blog._id} className={`col-span-1 ${index % 2 === 0 ? "md:pr-1 pr-0" : "md:pl-1 pl-0"} pb-1`}>
                      <Blogcard {...blog} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {blogposts.slice(5).map((blog) => (
                <div key={blog._id} className="col-span-1 p-1">
                  <Blogcard {...blog} />
                </div>
              ))}
            </div>
          </div>
          <Footerpage />
        </div>
      </div>
    </>
  );
}

const Blogcard = ({ image, title, month, year, slug, readtime, date, isLatest }: BlogPost & { isLatest?: boolean }) => {
  return (
    <div className="blog-card">
      <Link href={`/post/${year}/${month}/${slug}`}>
        <div className="blog-card-cover" style={{ backgroundImage: `url(${backendUrl}${image})` }}>
          {isLatest && <div className="latest-blog-card">LATEST</div>}
          <div className="blog-card-content">
            <p className="text-[16px] font-bold">{title.length > 120 ? `${title.substring(0, 120)}...` : title}</p>
            <h3 className="text-sm mt-2">
              <p className="italic">Posted on {date} {month}, {year}</p>
              <p className="text-gray-500 dark:text-gray-400">{readtime}-minute read</p>
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};
