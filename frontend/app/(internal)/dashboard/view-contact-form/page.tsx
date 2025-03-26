"use client"

import ContactView from '@/components/internal/contact/contact-view'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

export default function ViewContactForm() {

    const { theme } = useTheme();
    const [isNightMode, setIsNightMode] = useState<boolean>(false);

    useEffect(() => {
        setIsNightMode(theme === 'light');
    }, [theme]);

    return (
        <div className={isNightMode ? 'bg-[#f1f5f9] min-h-[calc(100vh-64px)]' : 'bg-[#1a222c] min-h-[calc(100vh-64px)]'}>
            <ContactView />
        </div>
    )
}
