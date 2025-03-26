"use client";

import { useTheme } from "next-themes";
import { Bebas_Neue, Poppins, PT_Sans_Narrow } from "next/font/google";
import Image from "next/image";

import "./about.scss";
import Footerpage from "@/components/footer/footerpage";
import { aboutTypes, BuildTestPhase, KeyTeamRoles } from "./array";
import { useState, useEffect } from "react";
import Link from "next/link";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const kodoMono = PT_Sans_Narrow({
  weight: "400",
  subsets: ["latin"],
  fallback: ['sans-serif'],
});

export default function AboutUsPage() {

  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    setIsNightMode(theme === 'light');
  }, [theme]);

  return (
    <>
      <div className="color-divider-left"></div>
      <div className="banner-background">
        <div className={!isNightMode ? `bg-[#000000dd] py-10` : `bg-[#ffffff50] py-10`}>
          <div className="lg:text-5xl md:text-4xl sm:text-2xl text-xl text-center font-bold">Company</div>
        </div>
      </div>
      <div className="color-divider-right"></div>
      <div className="main-section-about">
        <div className={!isNightMode ? `bg-[#000000dd] py-4` : `bg-[#ffffff97] py-4`}>
          <div className="titlebar"><h1 className={!isNightMode ? `text-white` : `text-black`}>About Green Light Immersive Experience</h1></div>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 ${poppins.className}`}>
            <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md text-justify ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
              <span className="lg:text-4xl text-3xl">Green Light Immersive Experience Inc.</span> is an early stage startup corporation that owns and operates
              the GreenLight XR Media<sup>TM</sup> live-event video streaming social media platform.
            </div>
            <p className={`mt-4 lg:text-3xl md:text-2xl text-xl z-10 mb-4 uppercase font-bold ${bebasNeue.className}`}>
              Meet our founder and president
            </p>
            <p className={`mt-3 xl:text-3xl lg:text-2xl text-xl z-10 mb-8 text-justify md:ml-4 ml-2`}>
              <Image src={'/images/avinash_singh.jpeg'} alt="Avinash Singh" height={500} width={500} className="w-[300px] max-w-full h-auto float-right ml-3 mb-3" />
              <b>Avinash Singh</b>, Founder and President, brings over two decades of experience driving growth and innovation across diverse industries.
              With expertise in strategy, digital reinvention, and client engagement, he transforms companies through partnerships and innovative solutions.
              Avinash leads with a culture of excellence and dedication, developing new business, mentoring talent, and shaping high-tech media&apos;s future.
            </p>
          </div>
        </div>
      </div>
      <div className="color-divider-right"></div>
      <div className="tv-background2"></div>
      <div className="color-divider-left"></div>
      <div className="main-section-about">
        <div className={!isNightMode ? `bg-[#000000dd] py-4` : `bg-[#ffffff97] py-4`}>
          <div className="titlebar"><h1 className={!isNightMode ? `text-white` : `text-black`}>ACTIVELY RECRUITING FOR KEY TEAM ROLES</h1></div>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 ${poppins.className}`}>
            <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md text-justify`}>
              We are looking for energetic and ambitious team members at all levels, from experienced
              professionals to recent grads to programming stars, to join us on our journey to revolutionize
              the industry with cutting-edge approaches.
            </div>
            <p className={`md:text-2xl sm:text-xl text-lg drop-shadow-md text-justify mt-3 ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
              If you have experience with and/or knowledge of the following, we would be delighted to talk with you.  Reach out to us at <Link href={"mailto:contact@greenlightxr.com"}>contact@greenlightxr.com</Link>:
            </p>
            <ul className="list-disc ml-8 mt-3 md:text-xl text-lg">
              <li>Computer Science, Computer Engineering, relevant technical field, or equivalent practical experience</li>
              <li>Experience in development of computer vision, image processing applications</li>
              <li>Understanding of machine learning, neural networks, and image processing techniques </li>
              <li>Experience in real-time computer graphics or GPU programming</li>
            </ul>
          </div>
          <Footerpage />
        </div>
      </div >
    </>
  );
}
