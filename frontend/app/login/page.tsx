"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for client-side navigation in Next.js 13+
import { loginUser } from '@/utils/auth';
import "./login.scss";
import { backendUrl } from '@/components/primitives';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await loginUser(email, password, csrfToken);
        if (response.message === "Login successful") {
            router.push('/dashboard');
        } else {
            setError(response.message);
        }
    };

    return (
        <div className='main-section'>
            <div className='bg-[#000000cf] min-h-screen flex items-center justify-center text-white'>
                <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm'>
                    <h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium'>Email</label>
                            <input
                                type='email'
                                id='email'
                                className='mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium'>Password</label>
                            <input
                                type='password'
                                id='password'
                                className='mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your password'
                                required
                            />
                        </div>
                        {error && <p className='text-red-500 text-sm'>{error}</p>}
                        <button
                            type='submit'
                            className='w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
