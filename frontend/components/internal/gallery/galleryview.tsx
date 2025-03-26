'use client'
import { backendUrl } from "@/components/primitives";
import React, { useEffect, useState } from "react";

interface GalleryItem {
    _id: string;
    image_path: string;
    alt_tag: string;
}

interface GalleryViewProps {
    gallery: GalleryItem[];
    setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
}

export default function GalleryView({ gallery, setGallery }: GalleryViewProps) {
    const [csrfToken, setCsrfToken] = useState<string>("");

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

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${backendUrl}/api/gallery/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-Token": csrfToken,
                },
                credentials: "include",
            });

            if (response.ok) {
                setGallery((prevGallery) => prevGallery.filter((item) => item._id !== id));
            } else {
                console.error("Failed to delete image");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div>
            {gallery.length === 0 ? (
                <p>No images found</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {gallery.map((item) => (
                        <div key={item._id} className="relative border p-2">
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-sm hover:bg-red-800"
                            >
                                ✖
                            </button>

                            <img
                                src={`${backendUrl}${item.image_path}`}
                                alt={item.alt_tag}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
