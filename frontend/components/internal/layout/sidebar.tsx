"use client"
import { siteConfig } from '@/config/site';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import './style.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {

  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNightMode(theme === 'light');
  }, [theme]);

  return (
    <>
      <div className={`min-h-screen px-4 ${!isNightMode ? 'bg-[#1a2c23]' : 'bg-[#80d7ab]'}`}>
        <div className='text-3xl pt-4'>Greenlight XR</div>
        {siteConfig.navMenuItems.map((item, index) => {
          const Icon = item.icon; //Icon extracted          
          return (
            <>
              <Link
                key={index}
                className={`
                  ${!isNightMode ? 'menu-buttons-black' : 'menu-buttons-white'} 
                  ${pathname === item.href ? "selected-menu-item" : ""}
                  `}
                href={item.href}>
                <Icon className="w-5 h-5 mr-2" /> {/* Render the icon */}
                <span>{item.label}</span>
              </Link>
            </>
          )
        })}
      </div>
    </>
  )
}
