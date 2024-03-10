const glob = require('glob')

const siteUrl = 'https://www.pati.gg'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  additionalPaths: async () => {
    try {
      const routes = await glob.sync('src/app/**/page.{md,mdx,js,jsx,ts,tsx}', {
        cwd: __dirname,
      })

      console.log('Routes:', routes) // Log the routes array for debugging
      console.log('Routes type:', typeof routes) // Log the type of routes variable

      if (!Array.isArray(routes)) {
        throw new Error('Routes is not an array')
      }

      const publicRoutes = routes.filter(
        (page) => !page.split('/').some((folder) => folder.startsWith('_'))
      )

      const publicRoutesWithoutRouteGroups = publicRoutes.map((page) =>
        page
          .split('/')
          .filter((folder) => !folder.startsWith('(') && !folder.endsWith(')'))
          .join('/')
      )

      const locs = publicRoutesWithoutRouteGroups.map((route) => {
        const path = route.replace(/^src\/app/, '').replace(/\/[^/]+$/, '')
        const loc = path === '' ? siteUrl : `${siteUrl}/${path}`
        return loc
      })

      const paths = locs.map((loc) => ({
        changefreq: 'daily',
        lastmod: new Date().toISOString(),
        loc,
        priority: 0.7,
      }))

      return paths
    } catch (error) {
      console.error('Error fetching routes:', error)
      return [] // Return an empty array or handle the error as needed
    }
  },
  siteUrl, // .게시하는 site의 url
  generateRobotsTxt: true, // robots.txt generate 여부 (자동생성 여부)
  sitemapSize: 7000, // sitemap별 최대 크기 (최대 크기가 넘어갈 경우 복수개의 sitemap으로 분리됨)
  changefreq: 'daily', // 페이지 주소 변경 빈도 (검색엔진에 제공됨) - always, daily, hourly, monthly, never, weekly, yearly 중 택 1
  priority: 1, // 페이지 주소 우선순위 (검색엔진에 제공됨, 우선순위가 높은 순서대로 크롤링함)
  robotsTxtOptions: {
    // 정책 설정
    policies: [
      {
        userAgent: '*', // 모든 agent 허용
        allow: '/', // 모든 페이지 주소 크롤링 허용
      },
      // 추가 정책이 필요할 경우 배열 요소로 추가 작성
    ],
  }, // robots.txt 옵션 설정
}
