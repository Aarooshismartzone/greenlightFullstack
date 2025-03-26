"use client"
import { useTheme } from 'next-themes';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function DashboardPage() {

  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  useEffect(() => {
    setIsNightMode(theme === 'light');
  }, [theme]);

  return (
    <div className={isNightMode ? 'bg-[#f1f5f9] min-h-[calc(100vh-64px)]' : 'bg-[#1a222c] min-h-[calc(100vh-64px)]'}>
      Dashboard Content
    </div>
  )
}
