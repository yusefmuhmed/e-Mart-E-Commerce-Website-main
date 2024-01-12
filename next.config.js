const path = require('path')
/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './localization.ts'
);
module.exports = withNextIntl({
  // Next.js configuration ...
  env: {
    CMS_BASE_URL: process.env.CMS_BASE_URL,
    CMS_READONLY_TOKEN: process.env.CMS_READONLY_TOKEN
  },
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/djrskkszi/**',
      }, {
        protocol: "https",
        hostname: "i.dummyjson.com",
        port: "",
        pathname: "/data/products/**",
      },
      {
        protocol: "https",
        hostname: "mdbootstrap.com",
        port: "",
        pathname: "/img/logo/mdb-transaprent-noshadows.png",
      }
    ],
  },
  trailingSlash: true,
});

