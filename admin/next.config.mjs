/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com'
            },
            {
                hostname: '127.0.0.1'
            }, {
                hostname: "res.cloudinary.com"
            }
        ],
    },
};

export default nextConfig;
