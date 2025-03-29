"use client"

import Footerpage from "@/components/footer/footerpage";
import { backendUrl, title } from "@/components/primitives";
import "./contact.scss";
import { useTheme } from "next-themes";
import { Poppins, PT_Sans_Narrow } from "next/font/google";
import { useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const kodoMono = PT_Sans_Narrow({
  weight: "400",
  subsets: ["latin"],
  fallback: ['sans-serif'],
});

export default function ContactPage() {

  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  useEffect(() => {
    setIsNightMode(theme === 'light');
  }, [theme]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    message: "",
  });

  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/csrf-token`, {
          credentials: "include"
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //update the form data
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/contact-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Submission error:", errorData);
        alert("Error submitting the form. Please try again.");
        return;
      }

      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", address: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <>
      <div className="color-divider-left"></div>
      <div className="banner-background">
        <div className={!isNightMode ? `bg-[#000000dd] py-10` : `bg-[#ffffff50] py-10`}>
          <div className="lg:text-5xl md:text-4xl sm:text-2xl text-xl text-center font-bold">Contact Us</div>
        </div>
      </div>
      <div className="color-divider-right"></div>
      <div className="main-section-contact">
        <div className={!isNightMode ? `bg-[#0000006f] py-4` : `bg-[#ffffff97] py-4`}>
          <div className={`lg:mx-20 md:mx-16 sm:mx-8 mx-2 px-2 py-4 text-justify`} >
            {/* HERO SECTION */}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
              <ContactBox heading="Our Office Address" description="2958 Preakness Dr, Stow, OH 44224" />
              <ContactBox heading="Our Email Address" description="contact@greenlightxr.com" />
              <ContactBox heading="Our Contact Number" description="(+1) 330-338-9273" />
            </div>
            <div className="my-2 mx-auto w-[600px] max-w-full opacity-80">
              <form onSubmit={handleSubmit} className={`flex flex-col gap-4 p-4 shadow-lg rounded ${!isNightMode ? `bg-[#1b02216f]` : `bg-[#e294ff97]`}`}>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="bordered"
                  required />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="bordered"
                  required />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border p-2 rounded"
                  required
                />
                <Input
                  label="Phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement; // Explicit cast
                    target.value = target.value.replace(/[^0-9+]/g, ""); // Allow only 0-9 and +
                  }}
                  variant="bordered"
                  required />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message/Feedback"
                  className="border p-2 rounded"
                />
                <Button type="submit" color="success">
                  Submit
                </Button>
              </form>
            </div>
          </div>
          <Footerpage />
        </div>
      </div>
    </>
  );
}

const ContactBox = (props: any) => {
  return (
    <>
      <div className="col-span-1">
        <div className="info-card">
          <h1 className={`text-xl uppercase font-bold ${kodoMono.className}`}>{props.heading}</h1>
          <p className={`mt-2 md:text-2xl sm:text-xl text-lg font-bold ${poppins.className}`}>{props.description}</p>
        </div>
      </div>
    </>
  )
}
