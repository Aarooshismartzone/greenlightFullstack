"use client"

import { title } from "@/components/primitives";
import Image from "next/image";
import "./whychooseus.scss";
import { useTheme } from "next-themes";
import Footerpage from "@/components/footer/footerpage";
import { Bebas_Neue, Poppins, PT_Sans_Narrow } from "next/font/google";
import { isq, wcutypes, techHighlights, immersiveProcess, socialParticipation, socl } from "./points";
import { useState, useEffect } from "react";

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
});

export default function WhyChooseUsPage() {

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
          <div className="lg:text-5xl md:text-4xl sm:text-2xl text-xl text-center font-bold">The Greenlight Experience</div>
        </div>
      </div>
      <div className="color-divider-right"></div>
      <div className="main-section-gli">
        <div className={!isNightMode ? `bg-[#000000dd] py-4` : `bg-[#ffffff97] py-4`}>
          {/* HERO SECTION */}
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 text-justify ${poppins.className}`} >
            <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-[#114d25]`}`}>
              <span className="lg:text-4xl text-3xl">GreenLight XR Media<sup>TM</sup></span> captures the depth and realism of events, offering viewers a participatory
              social-media front-row seat experience in the comfort of their own homes, allowing them, and their family and
              friends, to feel the excitement and energy as if they were physically present.
            </div>
            <p className={`mt-3 text-xl z-10 mb-4`}>
              Designed to push the boundaries of interactivity, our solution allows audiences to engage with live
              content in real-time, fostering a shared experience that feels truly present. With top-tier
              quality, seamless accessibility, and innovative 3-D Social Participation, we&apos;re setting a new
              standard for immersive media.
            </p>
          </div>
          <div className="titlebar"><h1 className={!isNightMode ? `text-white` : `text-black`}>3-D SOCIAL PARTICIPATION: REDEFINING INTERACTION</h1></div>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 ${poppins.className}`} >
            <p className={`mt-3 text-xl z-10 mb-4`}>With our 3-D Social Participation, viewers move from passive watching to active sharing:</p>

            {socl.map((c: wcutypes) => (
              <>
                <p className={`babus-font ${kodoMono.className}`}>
                  {c.title}
                </p>
                <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
                  {c.description}
                </div>
              </>
            ))}
            <p className={`mt-3 text-xl z-10 mb-4 italic`}>
              With GreenLight XR Media<sup>TM</sup>, you don&apos;t just watch; you and your family/friends
              participate, share, and immerse fully in every moment. Choose GreenLight to transform how you
              experience live events!
            </p>
          </div>
        </div>

        <div className="color-divider-right"></div>
        <div className="tv-background"></div>
        <div className="color-divider-left"></div>
        <div className="main-section-gli">
          <div className={!isNightMode ? `bg-[#000000dd] py-4` : `bg-[#ffffff97] py-4`}>
            <div className="titlebar"><h1 className={!isNightMode ? `text-white` : `text-black`}>TRULY REMARKABLE VIEWING EXPERIENCE</h1></div>
            <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 text-justify ${poppins.className}`} >
              <p className={`mt-3 text-xl z-10 mb-4`}>Our platform integrates advanced technical elements
                that make every experience remarkable:</p>

              {isq.map((c: wcutypes) => (
                <>
                  <p className={`babus-font ${kodoMono.className}`}>
                    {c.title}
                  </p>
                  <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
                    {c.description}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="color-divider-right"></div>
      <div className="tv-background2"></div>
      <div className="color-divider-left"></div>
      <div className="main-section-gli">
        <div className={!isNightMode ? `bg-[#000000dd] py-4` : `bg-[#ffffff97] py-4`}>
          <div className="titlebar"><h1 className={!isNightMode ? `text-white` : `text-black`}>NEXT-LEVEL TECHNOLOGY FOR REAL-TIME MAGIC</h1></div>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 ${poppins.className}`} >
            <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-[#114d25]`}`}>
              <span className="lg:text-4xl text-3xl">GreenLight XR Media<sup>TM</sup>&apos;s</span> innovative video streaming and
              social platform harnesses cutting-edge technologies such as Augmented Reality (AR), Virtual Reality (VR),
              3D cameras, 5G networks, and Artificial Intelligence/Machine Learning (AI/ML) to redefine how people engage
              with events.
            </div>
            {immersiveProcess.map((c: wcutypes) => (
              <>
                <p className={`babus-font ${kodoMono.className}`}>
                  {c.title}
                </p>
                <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
                  {c.description}
                </div>
              </>
            ))}
          </div>

          <Footerpage />
        </div>
      </div>
    </>
  );
}
