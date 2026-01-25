/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
const { patterns } = require('./sitemap-excludes.json')

// Env is validated during build via src/lib/env.ts
// If build succeeded, NEXT_PUBLIC_SERVER_URL is guaranteed to be set
const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: patterns,
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
