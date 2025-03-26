"use client";

import { Button, Input, Textarea } from "@heroui/react";
import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { backendUrl } from "@/components/primitives";

interface BlogProps {
  blogData?: any;
  isEditing?: boolean;
}

export default function AddBlogComponent({ blogData, isEditing = false }: BlogProps) {
  const router = useRouter();

  const [csrfToken, setCsrfToken] = useState<string>("");
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [readTime, setReadTime] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    keywords: "",
  });

  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData.title || "",
        slug: blogData.slug || "",
        content: blogData.content || "",
        keywords: blogData.keywords || "",
      });
    }
  }, [blogData]);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });

      if (blogData?.content) {
        quillInstance.current.root.innerHTML = blogData.content;
      }

      quillInstance.current.on("text-change", () => {
        const text = quillInstance.current?.getText().trim() || "";
        const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
        setReadTime(Math.ceil(wordCount / 200)); // Assuming 200 WPM reading speed
      });
    }
  }, [blogData]);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/csrf-token`, {
          credentials: "include",
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if (name === "title") {
        updatedForm.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
          .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
      }
      return updatedForm;
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("content", quillInstance.current?.root.innerHTML || "");
    data.append("keywords", formData.keywords);
    data.append("readtime", readTime.toString());
    if (image) {
      data.append("image", image);
    }

    try {
      const url = isEditing
        ? `${backendUrl}/api/blogs/${blogData.slug}`
        : `${backendUrl}/api/blogs`;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: data,
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? "update" : "create"} blog`);

      alert(`Blog ${isEditing ? "updated" : "created"} successfully`);
      router.push('/dashboard/blog'); //return to blog list

    } catch (error) {
      console.error(error);
      alert(`Error ${isEditing ? "updating" : "creating"} blog`);
    }
  };

  return (
    <div className="my-2 mx-auto w-[800px] max-w-full rounded max-h-[500px] overflow-y-scroll">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 shadow-lg">
        <Input type="text" variant="bordered" label="Title" name="title" value={formData.title} onChange={handleChange} />
        <Input type="text" variant="bordered" label="Slug" name="slug" value={formData.slug} readOnly />

        <label className="mt-4">Content:</label>
        <div ref={quillRef} className="border border-gray-300 rounded" />

        <Input type="file" variant="bordered" label="Upload Image" accept="image/*" onChange={handleImageChange} />
        {image && <p>Selected Image: {image.name}</p>}

        <Textarea name="keywords" label="Keywords" variant="bordered" value={formData.keywords} onChange={handleChange} />

        <p className="text-gray-500">Estimated Read Time: {readTime} min</p>
        <Button type="submit" color="success">{isEditing ? "Update Blog" : "Submit"}</Button>
      </form>
    </div>
  );
}
