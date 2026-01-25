/* eslint-disable no-undef */

// Env is validated during build via src/lib/env.ts
// If build succeeded, NEXT_PUBLIC_SERVER_URL is guaranteed to be set
const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/pages-sitemap.xml',
    '/test*',
    '/search*',
    '/posts*',
    '/home-copy*',
    '/email-previews*',
    '/icon-*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/',
        // disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`],
  },
}
