/* eslint-disable no-undef */

// Env is validated during build via src/lib/env.ts
// If build succeeded, NEXT_PUBLIC_SERVER_URL is guaranteed to be set
const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL
const isProduction = process.env.VERCEL_ENV === 'production'

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
    policies: isProduction
      ? [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }]
      : [{ userAgent: '*', disallow: '/' }],
    additionalSitemaps: isProduction ? [`${SITE_URL}/pages-sitemap.xml`] : [],
  },
}
