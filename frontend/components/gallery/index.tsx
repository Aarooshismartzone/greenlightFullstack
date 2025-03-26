"use client";

import React, { useEffect, useState } from "react";
import "./gallery.scss";
import { useTheme } from "next-themes";
import Footerpage from "../footer/footerpage";
import { GalleryItem } from "@/utils/interfaces";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { backendUrl } from "../primitives";

export default function GalleryComponent() {
    const { theme } = useTheme();
    const [isNightMode, setIsNightMode] = useState(false);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    useEffect(() => {
        setIsNightMode(theme === "light");
    }, [theme]);

    // Fetch gallery images from backend
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch(`${backendUrl}/api/gallery/all`);
                const data: GalleryItem[] = await res.json();
                setGallery(data);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        };
        fetchGallery();
    }, []);

    const handleImageClick = (image: GalleryItem) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const showNextImage = () => {
        if (selectedImage) {
            const currentIndex = gallery.findIndex(img => img._id === selectedImage._id);
            const nextImage = gallery[currentIndex - 1] || gallery[gallery.length - 1];
            setSelectedImage(nextImage);
        }
    };

    const showPreviousImage = () => {
        if (selectedImage) {
            const currentIndex = gallery.findIndex(img => img._id === selectedImage._id);
            const prevImage = gallery[currentIndex + 1] || gallery[0];
            setSelectedImage(prevImage);
        }
    };

    return (
        <>
            <div className="color-divider-left"></div>
            <div className="banner-background">
                <div className={!isNightMode ? `bg-[#000000dd] py-10` : `bg-[#ffffff50] py-10`}>
                    <div className="lg:text-5xl md:text-4xl sm:text-2xl text-xl text-center font-bold">Gallery</div>
                </div>
            </div>
            <div className="color-divider-right"></div>
            <div className="main-section-gallery">
                <div className={!isNightMode ? `bg-[#000000dd] py-4` : `bg-[#ffffff97] py-4`}>
                    <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4`}>
                        <div className="gallery-grid">
                            {gallery.length === 0 ? (
                                <p className="text-center text-gray-500">No images available</p>
                            ) : (
                                gallery
                                    .slice() // Create a copy before sorting
                                    .sort((a, b) => b._id.localeCompare(a._id)) // Sort by `_id` (newest first)
                                    .map(image => (
                                        <div className="col-span-1" key={image._id}>
                                            <button
                                                className="gallery-item cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
                                                onClick={() => handleImageClick(image)}
                                                style={{ padding: 0, border: "none", background: "none" }}
                                                aria-label={`View image: ${image.alt_tag}`}
                                            >
                                                <Image
                                                    src={`${backendUrl}${image.image_path}`}
                                                    alt={image.alt_tag}
                                                    height={1000}
                                                    width={1000}
                                                    className="object-cover w-full h-full"
                                                />
                                            </button>
                                        </div>
                                    ))
                            )}
                        </div>

                        {selectedImage && (
                            <>
                                <div className="modal-overlay" onClick={closeModal} role="button" tabIndex={0} aria-label="Close modal">
                                    <div className="modal-content" role="button" onClick={e => e.stopPropagation()}>
                                        <Image
                                            src={`${backendUrl}${selectedImage.image_path}`}
                                            alt={selectedImage.alt_tag}
                                            height={1000}
                                            width={1000}
                                            className="w-full h-full object-contain"
                                        />
                                        <button className="modal-close" onClick={closeModal} aria-label="Close">
                                            <ImCross className="p-1 bg-black" />
                                        </button>
                                        <button className="modal-prev" onClick={showPreviousImage} aria-label="Previous Image">
                                            <FaChevronLeft />
                                        </button>
                                        <button className="modal-next" onClick={showNextImage} aria-label="Next Image">
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <p className={`md:text-2xl sm:text-xl text-lg drop-shadow-md text-center mt-3 ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
                        This page is presently under development
                    </p>
                    <Footerpage />
                </div>
            </div>
        </>
    );
}
