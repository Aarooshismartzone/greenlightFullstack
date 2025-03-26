/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        middleware: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8081', // Change this if your backend is running on a different port
                pathname: '/uploads/**', // Adjust based on your actual API response
            },
        ],
    },
};

module.exports = nextConfig;
