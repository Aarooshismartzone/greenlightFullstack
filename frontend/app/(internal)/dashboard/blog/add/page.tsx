"use client"

import AddBlogComponent from '@/components/internal/blog/add-blog';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

export default function AddPost() {
  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  useEffect(() => {
    setIsNightMode(theme === 'light');
  }, [theme]);
  return (
    <div className={isNightMode ? 'bg-[#f1f5f9] min-h-[calc(100vh-64px)]' : 'bg-[#1a222c] min-h-[calc(100vh-64px)]'}>
      <h1 className="text-2xl text-center py-3">Add a Blog Post</h1>
      <AddBlogComponent />
    </div>
  )
}
