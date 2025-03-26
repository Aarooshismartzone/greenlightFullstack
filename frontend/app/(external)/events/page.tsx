"use client"

import { title } from "@/components/primitives";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import "./ourmarket.scss";
import { Poppins, PT_Sans_Narrow } from "next/font/google";
import { ExpansionAreas, marketTypes } from "./market";
import Footerpage from "@/components/footer/footerpage";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const kodoMono = PT_Sans_Narrow({
  weight: "400",
  subsets: ["latin"],
  fallback: ['sans-serif'],
});

export default function OurMarketPage() {

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
          <div className="lg:text-5xl md:text-4xl sm:text-2xl text-xl text-center font-bold">Events</div>
        </div>
      </div>
      <div className="color-divider-right"></div>
      <div className="main-section-ourmarket">
        <div className={!isNightMode ? `bg-[#000000dd] py-4` : `bg-[#ffffff97] py-4`}>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 text-justify ${poppins.className}`} >
            <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-[#114d25]`}`}>
              With initial focus on sports and entertainment, <span className="lg:text-4xl text-3xl">GreenLight XR Media<sup>TM</sup></span>
              captures the hearts of global audiences by bringing them closer to live events than ever before.
              Combining advanced capture and rendering technology with a flexible approach, the company is
              primed to deliver unforgettable experiences and unlock untapped potential in the 3D video
              streaming landscape.
            </div>
          </div>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 text-justify ${poppins.className}`}>
            <div className={`md:text-3xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-[#114d25]`} ${kodoMono.className}`}>
              Live Sporting Events
            </div>
            <p className={`mt-3 text-xl z-10 mb-4`}>
              GreenLight XR Media<sup>TM</sup> aims to provide original curated sporting content in production
              partnerships with content owners.  Target sports include tennis, basketball, hockey, football,
              baseball, soccer, cricket, boxing, wrestling, volleyball, auto racing, horse racing, track and
              field, swimming and gymnastics.
            </p>
            <div className={`md:text-3xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-[#114d25]`} ${kodoMono.className}`}>
              Live Entertainment Events
            </div>
            <p className={`mt-3 text-xl z-10 mb-4`}>
              In the entertainment sector, we are focused on live concerts and performance arts, including band
              tours, music recitals, award shows and plays across multiple genres (such as pop, country, K-pop,
              Broadway).
            </p>
            <p className={`mt-3 text-xl z-10 mb-4`}>Of course, content recording is available for fans to enjoy repeat viewing.</p>
          </div>
        </div>
      </div>
      <div className="color-divider-right"></div>
      <div className="tv-background2"></div>
      <div className="color-divider-left"></div>
      <div className="main-section-ourmarket">
        <div className={!isNightMode ? `bg-[#000000dd] py-4` : `bg-[#ffffff97] py-4`}>
          <div className="titlebar"><h1 className={!isNightMode ? `text-white` : `text-black`}>Future Expansion into Diverse Sectors</h1></div>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4  text-justify ${poppins.className}`} >
            <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-[#114d25]`}`}>
              While sports and entertainment serve as the starting point, <span className="lg:text-4xl text-3xl">GreenLight XR Media<sup>TM</sup></span> has
              developed its solution with versatility in mind. The company&apos;s technology is adaptable
              to a variety of sectors, both live and pre-recorded, with applications that promise
              transformative experiences in the following areas:
            </div>
            <div className={`my-5 ${poppins.className}`}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                {ExpansionAreas.map((ea: marketTypes) => (
                  <>
                    <div className="col-span-1">
                      <div className="mtcard">
                        <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-[#114d25]`}`}>
                          {ea.title}
                        </div>
                        <p className={`mt-3 md:text-xl text-lg z-10 mb-4`}>
                          {ea.description}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 text-justify ${poppins.className}`} >
            <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-[#114d25]`}`}>
              <span className="lg:text-4xl text-3xl">GreenLight XR Media<sup>TM</sup></span> envisions a future where 3D streaming becomes a
              cornerstone of interactive experiences across multiple industries. By prioritizing immersive engagement and
              seeking strategic partnerships, the company is on a path to redefine how audiences participate in events,
              learn remotely, and explore new environments.
            </div>
          </div>
          <Footerpage />
        </div>
      </div>
    </>
  );
}
