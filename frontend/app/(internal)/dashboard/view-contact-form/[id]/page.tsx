"use client";

import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { backendUrl } from "@/components/primitives";

interface ContactInterface {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  message: string;
}

export default function ViewIndividualContact({ params }: { params: { id: string } }) {
  const { theme } = useTheme();
  const router = useRouter();
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [contact, setContact] = useState<ContactInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsNightMode(theme === "dark");
  }, [theme]);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/backend/check-contact-form/${params.id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ContactInterface = await response.json();
        setContact(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact details:", error);
        setError("Failed to load contact details.");
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [params.id]);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/csrf-token`, {
          credentials: "include",
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleDelete = async () => {
    if (!contact) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${backendUrl}/api/backend/delete-contact/${params.id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete contact. Status: ${response.status}`);
      }

      alert("Contact deleted successfully");
      router.push("/dashboard/view-contact-form"); // Redirect to contacts list after deletion
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact.");
    }
  };

  if (loading) {
    return <p>Loading contact details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={`p-4 min-h-[calc(100vh-64px)] ${isNightMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {contact ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Contact Details</h1>
          <div className="grid grid-cols-2 gap-2">
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Address:</strong> {contact.address}</p>
            <p><strong>Message:</strong></p>
          </div>
          <div className="p-4">
            {contact.message}
          </div>
          <Link href={`mailto:${contact.email}`}>
            <Button>Send an email</Button>
          </Link>
          <Button className="ml-4 bg-red-500 text-white" onPress={handleDelete}>Delete Contact</Button>
        </div>
      ) : (
        <p>No contact details found.</p>
      )}
    </div>
  );
}
