import React from "react"
import "./footerpage.scss"
import { useTheme } from "next-themes";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { Button } from "@heroui/button";

export default function Footerpage() {

    const { theme } = useTheme();
    const isNightMode = theme === "light";

    return (
        <>
            <div className="color-divider"></div>
            <div className="my-5 lg:mx-20 md:mx-16 mx-12 px-2">
                <div className="grid lg:grid-flow-col grid-flow-row gap-4">
                    <div className="lg:col-span-2 row-span-1 flex flex-col justify-center">
                        <div className="lg:w-64 w-44 flex justify-center">
                            <Image src={`/images/logo.png`} height={300} width={300} className="lg:w-60 w-40 max-w-full h-auto" alt="green light" />
                        </div>
                    </div>
                    <div className="lg:col-span-1 row-span-1 flex flex-col justify-center">
                        <div className="sidecard">
                            <ul className="list-none">
                                {siteConfig.navItems.map((item, index) => (
                                    <>
                                        <li key={index} className="uppercase font-bold"><Link href={item.href}>{item.label}</Link></li>
                                    </>
                                )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="lg:col-span-2 row-span-1 flex flex-col justify-center">
                        <div className="flex justify-end">
                            <div className="w-52 relative">
                                <Button className="bg-white text-black font-bold rounded-none w-full">SUBSCRIBE</Button>
                                <p className="mt-1 text-lg font-bold text-center">Subscribe to our latest newsletter</p>

                                <div className="mt-10 bg-white text-black px-1 py-3">
                                    Follow us_____
                                    <div className="flex justify-evenly mt-2">
                                        <Link aria-label="Twitter" href={siteConfig.links.twitter}>
                                            <FaSquareXTwitter className="text-2xl md:text-lg sm:text-sm text-black" />
                                        </Link>
                                        <Link aria-label="Instagram" href={siteConfig.links.instagram}>
                                            <FaSquareInstagram className="text-2xl md:text-lg sm:text-sm text-black" />
                                        </Link>
                                        <Link aria-label="Facebook" href={siteConfig.links.facebook}>
                                            <FaFacebookSquare className="text-2xl md:text-lg sm:text-sm text-black" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="bg-green-800" />
            <div className="pt-5 lg:mx-20 md:mx-16 mx-12">
                <div className="flex md:flex-row flex-col justify-between md:text-lg text-xs">
                        <p className="md:text-left text-center">Copyright 2024,&nbsp; GreenLight XR Media<sup>TM</sup></p>
                        <p className="md:text-left text-center">Webpage developed by <Link href={`https://www.aarooshi.com`} target="_blank" className="font-bold">aarooshi.com</Link></p>
                </div>
            </div>
        </>
    )
}
