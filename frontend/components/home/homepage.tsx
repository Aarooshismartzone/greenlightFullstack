"use client";

import { useTheme } from "next-themes";
import Image from "next/image"
import React, { useEffect, useState } from "react"
import "./homepage.scss"
import { Bebas_Neue, Poppins } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import Footerpage from "../footer/footerpage";

const bebasNeue = Bebas_Neue({
    weight: "400",
    subsets: ["latin"],
});

const poppins = Poppins({
    weight: "400",
    subsets: ["latin"],
});

export default function Homepage() {

    const { theme } = useTheme();
    const [isNightMode, setIsNightMode] = useState(false);

    useEffect(() => {
        setIsNightMode(theme === 'light');
    }, [theme]);

    return (
        <>
            <div className="color-divider-left"></div>
            <Image src={`/images/cover.webp`} height={1000} width={1000} className="w-full xl:h-[630px] h-auto" alt="Cover Page GreenLight" />
            <div className="color-divider-right"></div>
            <div className="main-section-homepage">
                <div className={!isNightMode ? `bg-[#000000b7] py-4` : `bg-[#ffffff2d] py-4`}>
                    <div className="titlebar"><h1 className={!isNightMode ? `text-white` : `text-black`}>Welcome to the world of <span className="font-bold">Greenlight</span></h1></div>
                    <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 ${poppins.className}`} >
                        <p className={`text-xl z-10 text-justify`}>Today, sports fans and music enthusiasts
                            are limited to experiencing events and programs in a passive, non-immersive manner on
                            flat, two-dimensional screens, reducing overall engagement and entertainment value.
                        </p>
                        <div className={`md:text-2xl sm:text-xl text-lg drop-shadow-md text-justify mt-3 mb-4 ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
                            <span className="lg:text-4xl text-3xl">GreenLight XR Media<sup>TM</sup> </span>is an innovative <b>video-streaming
                                social platform</b> that transforms the passive viewing experience by capturing and transmitting
                            live events in <b>real-time</b> with <b>3D volumetric displays</b>, creating a highly <b>participative, immersive
                                social</b> environment for sports and concert fans.
                        </div>
                        <div className="titlebar"><h1 className={!isNightMode ? `text-white font-bold` : `text-black font-bold`}>View Your Favourite Event <i>Live</i> in Vivid <i>3D</i></h1></div>
                        <div className="text-center text-green-500 uppercase lg:text-4xl md:text-2xl text-xl mb-4 font-bold">With your <i>family and friends</i></div>
                        <Carousel />
                        <div className="text-center">
                            <p className={`mt-5 lg:text-3xl md:text-2xl text-xl z-10 mb-4 uppercase font-bold ${bebasNeue.className}`}>
                                IMAGINE BEING AT THE EPICENTER OF THE ACTION, FEELING THE PALPABLE ENERGY AND EXCITEMENT
                                AS IF YOU AND YOUR FAMILY AND FRIENDS WERE PHYSICALLY PRESENT.
                            </p>
                            <p className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
                                <span className="lg:text-4xl text-3xl">GreenLight XR Media<sup>TM</sup></span> makes it a reality. Our advanced streaming capabilities
                                transmit live image footage in stunning 3-dimensional formats, providing an immersive experience that transports you into the
                                heart of the event itself.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="color-divider-right"></div>
            <div className="tv-background"></div>
            <div className="color-divider-left"></div>
            {/* BELOW TV BACKGROUND */}
            <div className="main-section-homepage">
                <div className={!isNightMode ? `bg-[#000000b7] py-4` : `bg-[#ffffff29] py-4`}>
                    <div className={`lg:mx-20 md:mx-16 sm:mx-12 mx-8 px-2 py-4 ${poppins.className}`} >
                        <div className="my-5 text-center">
                            <p className={`md:text-2xl sm:text-xl text-lg drop-shadow-md ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>
                                At <span className="lg:text-4xl text-3xl">GreenLight XR Media<sup>TM</sup></span>, our mission is to redefine the consumption of sports
                                and entertainment by introducing cutting-edge live-event streaming in a captivating 3D format.
                            </p>
                            <p className={`text-xl z-10 text-justify mt-4`}>
                                By capturing the depth of realism of events, we offer viewers a front-row seat experience from the comfort of their own homes,
                                allowing them to feel the excitement and energy as if they were physically present.
                            </p>
                        </div>
                    </div>
                    <Footerpage />
                </div>
            </div>
        </>
    )
}

const Carousel = () => {
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}
                effect="coverflow"
                centeredSlides={true}
                loop={true}
                slidesPerView={1} // Default to 1 image for mobile
                breakpoints={{
                    640: { // Tablet
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: { // Desktop
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                navigation
                className="swiperContainer"
            >
                <SwiperSlide>
                    <Image src={`/images/carousel-images/swiper1.jpg`} alt="swiper" height={500} width={500} className="h-auto w-full" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={`/images/carousel-images/swiper2.jpg`} alt="swiper" height={500} width={500} className="h-auto w-full" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={`/images/carousel-images/swiper3.jpg`} alt="swiper" height={500} width={500} className="h-auto w-full" />
                </SwiperSlide>
            </Swiper>
        </>
    );
};