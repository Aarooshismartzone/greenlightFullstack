import { backendUrl } from '@/components/primitives';
import { blogInterface } from '@/utils/interfaces'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination
} from '@mui/material';
import { useTheme } from 'next-themes';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function BlogInternalComponent() {
    const [csrfToken, setCsrfToken] = useState<string>("");
    const { theme } = useTheme();
    const [isNightMode, setIsNightMode] = useState<boolean>(false);
    const [blogPosts, setBlogPosts] = useState<blogInterface[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    useEffect(() => {
        setIsNightMode(theme === "dark");
    }, [theme]);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/blogs`, {
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: blogInterface[] = await response.json();

                // Sort by timestamp in descending order (newest first)
                const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setBlogPosts(sortedData);
            } catch (error) {
                console.error("Error fetching blog details:", error);
            }
        };
        fetchBlogPosts();
    }, []);

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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    return (
        <div>
            <h1 className="text-2xl text-center py-3">Blog Posts</h1>
            <Link href={'/dashboard/blog/add'}>Add Blog Post</Link>
            {blogPosts.length > 0 ? (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: isNightMode ? "white" : "black" }}>SN</TableCell>
                                    <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Title</TableCell>
                                    <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Image</TableCell>
                                    <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Posting Date</TableCell>
                                    <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Edit</TableCell>
                                    <TableCell sx={{ color: isNightMode ? "white" : "black" }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blogPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                                    <TableRow key={post._id}>
                                        <TableCell sx={{ color: isNightMode ? "white" : "black" }}>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ color: isNightMode ? "white" : "black" }}>{post.title}</TableCell>
                                        <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                                            <img src={`${backendUrl}${post.image}`} alt={post.title} width={100} height={100} />
                                        </TableCell>
                                        <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                                            <Link href={`/dashboard/blog/edit/${post.slug}`}>Edit</Link>
                                        </TableCell>
                                        <TableCell sx={{ color: isNightMode ? "white" : "black" }}>
                                            <button
                                                onClick={async () => {
                                                    const confirmDelete = confirm("Are you sure you want to delete this blog?");
                                                    if (confirmDelete) {
                                                        try {
                                                            const response = await fetch(`${backendUrl}/api/blogs/${post.slug}`, {
                                                                method: "DELETE",
                                                                headers: {
                                                                    "X-CSRF-Token": csrfToken,
                                                                },
                                                                credentials: "include",
                                                            });

                                                            if (response.ok) {
                                                                alert("Blog deleted successfully!");
                                                                // Optionally, refresh the page or update state to remove the deleted blog from the list
                                                            } else {
                                                                alert("Failed to delete blog.");
                                                            }
                                                        } catch (error) {
                                                            console.error("Error deleting blog:", error);
                                                            alert("An error occurred while deleting the blog.");
                                                        }
                                                    }
                                                }}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={blogPosts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ color: isNightMode ? "white" : "black" }}
                    />
                </>
            ) : (
                <p>Loading Blogpost details...</p>
            )}
        </div>
    )
}
