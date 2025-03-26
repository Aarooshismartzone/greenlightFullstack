import { IconType } from "react-icons";
import { MdDashboardCustomize } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import { FaBlogger, FaImages, FaWpforms } from "react-icons/fa6";

export type SiteConfig = typeof siteConfig;

interface NavMenuItem {
  label: string;
  href: string;
  icon: IconType; // Use IconType instead of JSX.Element
}

export const siteConfig = {
  name: "Green Light XR Media",
  description: "View your favorite event live in vivid 3-D with your friends and family.",
  navItems: [
    {
      label: `GreenLight XR Media™`,
      href: "/",
    },
    {
      label: "The Greenlight Experience",
      href: "/the-greenlight-experience",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Contact Us",
      href: "/contact-us",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: MdDashboardCustomize,
    },
    {
      label: "Form Entries",
      href: "/dashboard/view-contact-form",
      icon: FaWpforms,
    },
    {
      label: "Blog",
      href: "/dashboard/blog",
      icon: FaBlogger,
    },
    {
      label: "Gallery",
      href: "/dashboard/gallery",
      icon: FaImages,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: FaCog,
    },
  ] as NavMenuItem[],
  links: {
    facebook: "https://facebook.com/#",
    twitter: "https://twitter.com/#",
    docs: "https://nextui.org",
    instagram: "https://instagram.com/#",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

