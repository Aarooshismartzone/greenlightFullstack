"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import Footerpage from '../footer/footerpage';
import { Poppins } from 'next/font/google';
import { blogpostsInterface } from '@/app/(external)/(blog)/blogposts';
import { blogInterface, BlogPost } from '@/utils/interfaces';

const poppins = Poppins({
    weight: "400",
    subsets: ["latin"],
});

export default function Postcontent(props: BlogPost) {

    const { theme } = useTheme();
    const [isNightMode, setIsNightMode] = useState<boolean>(false);

    useEffect(() => {
        setIsNightMode(theme === "light");
    }, [theme]);

    return (
        <>
            <title>{props.title}</title>
            <meta name="keywords" content={props.keywords} />
            <div className="color-divider-left"></div>
            <div className="banner-background">
                <div className={!isNightMode ? `bg-[#000000dd] py-10` : `bg-[#ffffffd6] py-10`}>
                    <div className={`lg:text-5xl md:text-4xl sm:text-2xl text-xl text-center ${poppins.className} ${!isNightMode ? `text-[#3ee051]` : `text-green-800`}`}>{props.title}</div>
                </div>
            </div>
            <div className="color-divider-right"></div>
            <div className="main-section-post" style={{backgroundImage: `url(http://localhost:8081${props.image})`}}>
                <div className={!isNightMode ? `bg-[#000000ed] py-4` : `bg-[#ffffffc9] py-4`}>
                    <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 ${poppins.className}`}>
                        <div>
                            <div>
                                <img src={`http://localhost:8081${props.image}`} alt={props.title} className='post-image' />
                                <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
                            </div>

                            <p className='mt-4 italic'><strong>Date Posted:</strong> {props.date} {props.month}, {props.year}</p>
                        </div>
                    </div>
                    <Footerpage />
                </div>
            </div>
        </>
    )
}
