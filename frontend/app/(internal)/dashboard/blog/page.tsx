"use client"
import BlogInternalComponent from '@/components/internal/blog/blog-internal';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

export default function ViewBlog() {
  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  useEffect(() => {
    setIsNightMode(theme === 'light');
  }, [theme]);
  return (
    <div className={isNightMode ? 'bg-[#f1f5f9] h-[calc(100vh-64px)] overflow-y-scroll' : 'bg-[#1a222c] h-[calc(100vh-64px)] overflow-y-scroll'}>
      <BlogInternalComponent />
    </div>
  )
}
