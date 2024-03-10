/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: 'discord.com',
      },
      {
        protocol: 'https',
        hostname: 'i.namu.wiki',
      },
    ],
  },
}

export default nextConfig
