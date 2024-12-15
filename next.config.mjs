/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_OPENAI_API_KEY: process.env.NEXT_OPENAI_API_KEY,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*',
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/api/(.*)', // Applies to all API routes
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
                ],
            },
        ];
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['image.tmdb.org'], // Add TMDB's image domain
    },

};

export default nextConfig;
