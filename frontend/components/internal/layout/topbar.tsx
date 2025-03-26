"use client"

import React, { useEffect, useState } from 'react'
import '../style.scss'
import { ThemeSwitch } from '@/components/theme-switch'
import { useTheme } from 'next-themes';
import { FiLogOut } from "react-icons/fi";
import { checkAuth, logoutUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';


export default function Topbar() {

  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string | null>(null); // Add state for firstname
  const router = useRouter();

  useEffect(() => {
    setIsNightMode(theme === 'light');
  }, [theme]);

  // Fetch the logged-in user's details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await checkAuth(); // Call checkAuth API
        if (response.authenticated && response.user) {
          setFirstname(response.user.firstname); // Set firstname from response
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.message === "Logout successful") {
        router.push("/login"); // Redirect to login page
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert(error);
    }
  };

  return (
    <>
      <div className={`py-4 px-8 shadow-md ${!isNightMode ? 'bg-purple-950' : 'bg-purple-400'}`}>
        <div className='flex flex-row justify-between'>
          <div className='text-2xl'>Welcome, {firstname}</div>
          <div>
            <ThemeSwitch className="text-xl md:text-lg sm:text-sm text-default-600" />
            <button onClick={handleLogout} className="text-xl mb-1 ml-1">
              <FiLogOut />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
