"use client"
import { backendUrl } from "@/components/primitives";
import { Button, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";

interface GalleryItem {
    _id: string;
    image_path: string;
    alt_tag: string;
}

export default function GalleryForm({ setGallery }: { setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>> }) {
    const [image, setImage] = useState<File | null>(null);
    const [altTag, setAltTag] = useState("");
    const [message, setMessage] = useState("");
    const [csrfToken, setCsrfToken] = useState<string>("");

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/csrf-token`, {
                    credentials: "include"
                });
                const data = await response.json();
                setCsrfToken(data.csrfToken);
            } catch (error) {
                console.error("Failed to fetch CSRF token:", error);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image || !altTag) {
            setMessage("Please provide an image and alt tag.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("alt_tag", altTag);

        try {
            const response = await fetch(`${backendUrl}/api/gallery/upload`, {
                method: "POST",
                headers: {
                    "X-CSRF-Token": csrfToken,
                },
                credentials: "include",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Upload successful!");
                setImage(null);
                setAltTag("");

                // Fetch updated gallery after upload
                const res = await fetch(`${backendUrl}/api/gallery/all`);
                const data = await res.json();
                setGallery(data); // Update gallery state
            } else {
                setMessage(result.error || "Upload failed.");
            }
        } catch (error) {
            setMessage("Error uploading image.");
        }
    };

    return (
        <div className="px-36 py-4">
            <h1 className="text-3xl font-bold mb-4">Upload Image</h1>
            <form onSubmit={handleSubmit}>
                <Input type="file" name="image" accept="image/*" className="py-2" onChange={handleFileChange} />
                <Input
                    type="text"
                    name="alt_tag"
                    placeholder="Alt tag"
                    className="py-2"
                    value={altTag}
                    onChange={(e) => setAltTag(e.target.value)}
                />
                <Button type="submit">Upload</Button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
