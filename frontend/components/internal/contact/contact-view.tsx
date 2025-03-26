"use client";

import { backendUrl } from "@/components/primitives";
import { Link } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface ContactInterface {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  message: string;
}

export default function ContactView() {
  const { theme } = useTheme();
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    setIsNightMode(theme === "dark");
  }, [theme]);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/backend/check-contact-form`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ContactInterface[] = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContactDetails();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  return (
    <div>
      <h1 className="text-2xl text-center py-3">Contact View</h1>
      {contacts.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: isNightMode ? "white" : "black" }}>SN</TableCell>
                  <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Name</TableCell>
                  <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Address</TableCell>
                  <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Phone Number</TableCell>
                  <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Email</TableCell>
                  <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contact, index) => (
                    <TableRow key={contact.name}>
                      <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                        {contact.name}
                      </TableCell>
                      <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                        {contact.address}
                      </TableCell>
                      <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                        {contact.phone}
                      </TableCell>
                      <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                        {contact.email}
                      </TableCell>
                      <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                        <Link isExternal href={`/dashboard/view-contact-form/${contact._id}`} className="underline">Check Details</Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={contacts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
            sx={{ color: isNightMode ? "white" : "black" }}
          />
        </>
      ) : (
        <p>Loading contact details...</p>
      )}
    </div>
  );
}
