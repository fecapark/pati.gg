import chromium from '@sparticuz/chromium'
import { NextRequest, NextResponse } from 'next/server'
import puppeteer, { Page } from 'puppeteer-core'

import { TagResponseData } from '@/types/tag'

const getBrowserToolsForCrawl = async (url: string) => {
  console.log('wow')
  const browser = await puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: false,
    ignoreHTTPSErrors: true,
  })
  console.log('wow2')
  const page = await browser.newPage()
  page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  )
  await page.goto(url)
  await page.waitForSelector('body')
  return { browser, page }
}

const checkIsAvailForCrawl = async (page: Page) => {
  try {
    await page.waitForSelector('h3.error__title', { timeout: 5000 })
    return false
  } catch (e) {
    return true
  }
}

const getUserTag = async (page: Page) => {
  const tagElement = await page.waitForSelector('p.txt_code')
  const tag = await tagElement?.evaluate((el) => el.textContent)

  if (!tag) return ''
  return tag
}

const getUserName = async (page: Page) => {
  const nameElement = await page.waitForSelector('span.txt_name')
  const name = await nameElement?.evaluate((el) => el.textContent)

  if (!name) return ''
  return name
}

const getUserAvatar = async (page: Page) => {
  const imgElement = await page.waitForSelector('div.img_avatar > img')
  const src = await imgElement?.evaluate((el) => el.src)

  if (!src) return null
  return src
}

const getUserPlayedMapleland = async (page: Page) => {
  const cards = await page.waitForSelector('ul.card-list')
  const gameNames = await cards?.evaluate((el) => {
    const gameNameElements = el.querySelectorAll('li div.game-card div.game__info a.game__name')
    return Array.from(gameNameElements).map((anchor) => anchor.textContent ?? '')
  })

  if (!gameNames || gameNames.length === 0) return false

  for (let i = 0; i < gameNames.length; i += 1) {
    if (gameNames[i].toLowerCase().includes('mapleland')) return true
  }
  return false
}

const getHTML = async (url: string): Promise<TagResponseData> => {
  const resultData: TagResponseData = {
    tag: '',
    name: '',
    avatar: null,
    playedMapleland: false,
    success: false,
  }

  const { browser, page } = await getBrowserToolsForCrawl(url)

  if (await checkIsAvailForCrawl(page)) {
    resultData.tag = await getUserTag(page)
    resultData.name = await getUserName(page)
    resultData.avatar = await getUserAvatar(page)
    resultData.playedMapleland = await getUserPlayedMapleland(page)
    resultData.success = resultData.tag !== ''
  }

  browser.close()
  return resultData
}

async function handler(req: NextRequest) {
  const requestedTagName = req.nextUrl.searchParams.get('tag')
  const res = await getHTML(`https://maplestoryworlds.nexon.com/ko/profile/${requestedTagName}`)

  return NextResponse.json(res)
}

export { handler as GET, handler as POST }
