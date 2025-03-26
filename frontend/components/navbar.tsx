"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { FaChevronLeft, FaFacebookSquare, FaUser } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    setIsNightMode(theme === 'light');
  }, [theme]);

  const pathname = usePathname(); // Use usePathname to get the current path
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <div className={!isNightMode ? `black-background` : `white-background`}>
        <NextUINavbar maxWidth="xl" position="sticky" className={`py-5 ${!isNightMode ? "b-overlay" : "w-overlay"}`}>
          <NavbarContent justify="start" className="basis-1/5 sm:basis-full">
            <div className="lg:w-52 md:w-40 w-20 flex">
              <Link href="/">
                <Image src={`/images/logo.png`} height={300} width={300} className="lg:w-48 md:w-36 w-20 h-auto" alt="green light" />
              </Link>
            </div>
          </NavbarContent>

          <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
            <ul className="hidden lg:flex gap-4 justify-start ml-2">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({
                        color: pathname === item.href ? "success" : "foreground",
                        className: "font-bold uppercase xl:text-sm text-xs",
                      }),
                      {
                        "text-green-500": pathname === item.href, // Green color for active page
                        "data-[active=true]:font-medium": pathname === item.href,
                      }
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </NavbarContent>

          <NavbarContent className="hidden lg:flex basis-1/5 sm:basis-full" justify="end">
            <NavbarItem className="hidden lg:flex gap-2">
              <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                <FaSquareXTwitter className="text-xl md:text-lg sm:text-sm text-default-600" />
              </Link>
              <Link isExternal aria-label="Instagram" href={siteConfig.links.instagram}>
                <FaSquareInstagram className="text-xl md:text-lg sm:text-sm text-default-600" />
              </Link>
              <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
                <FaFacebookSquare className="text-xl md:text-lg sm:text-sm text-default-600" />
              </Link>
              <ThemeSwitch className="text-xl md:text-lg sm:text-sm text-default-600" />
              <Link isExternal aria-label="Login" href={`/login`}>
                <FaUser className="text-xl md:text-lg sm:text-sm text-default-600" />
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
            <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
              <FaSquareXTwitter className="text-xl md:text-lg sm:text-sm text-default-600" />
            </Link>
            <Link isExternal aria-label="Instagram" href={siteConfig.links.instagram}>
              <FaSquareInstagram className="text-xl md:text-lg sm:text-sm text-default-600" />
            </Link>
            <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
              <FaFacebookSquare className="text-xl md:text-lg sm:text-sm text-default-600" />
            </Link>
            <ThemeSwitch className="text-xl md:text-lg sm:text-sm text-default-600" />
            <Link isExternal aria-label="Login" href={`/login`}>
              <FaUser className="text-xl md:text-lg sm:text-sm text-default-600" />
            </Link>
            <GiHamburgerMenu className="text-lg" onClick={toggleDrawer(true)} />
          </NavbarContent>
        </NextUINavbar>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className={`h-dvh relative ${!isNightMode ? 'black-background' : 'white-background'}`}>
          <div className="absolute top-1 right-1 bg-green-800 rounded-lg">
            <FaChevronLeft onClick={toggleDrawer(false)} className="text-2xl text-white p-1" />
          </div>
          <ul className="list-none mx-4 px-2 mt-8 font-bold">
            {siteConfig.navItems.map((item, index) => (
              <li key={index} className="my-1">
                <Link
                  href={item.href}
                  className={`py-2 px-2 my-1 uppercase w-full ${pathname === item.href ? "bg-green-500" : "bg-[#000000c7]"}`}
                  onClick={toggleDrawer(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
};
