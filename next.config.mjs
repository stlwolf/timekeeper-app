import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 他の Next.js の設定をここに記述
};

const pwaConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
});

export default pwaConfig(nextConfig);