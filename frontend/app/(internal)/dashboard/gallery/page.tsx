"use client"
import GalleryForm from '@/components/internal/gallery/galleryform';
import GalleryView from '@/components/internal/gallery/galleryview';
import { GalleryItem } from '@/utils/interfaces';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

export default function GalleryInternal() {
    const { theme } = useTheme();
    const [isNightMode, setIsNightMode] = useState<boolean>(false);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);

    useEffect(() => {
        setIsNightMode(theme === 'light');
    }, [theme]);

    // Fetch gallery images initially
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch("http://localhost:8081/api/gallery/all");
                const data: GalleryItem[] = await res.json();
                setGallery(data);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        };
        fetchGallery();
    }, []);

    return (
        <div className={isNightMode ? 'bg-[#f1f5f9] h-[calc(100vh-64px)] overflow-y-scroll' : 'bg-[#1a222c] h-[calc(100vh-64px)] overflow-y-scroll'}>
            <GalleryForm setGallery={setGallery} />
            <GalleryView gallery={gallery} setGallery={setGallery} />
        </div>
    )
}
