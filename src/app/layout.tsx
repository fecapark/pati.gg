import '@/styles/globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Footer from '@/components/layouts/Footer/Footer'
import Header from '@/components/layouts/Header/Header'
import Modal from '@/components/layouts/Modal/Modal'
import NextAuthProvider from '@/components/providers/NextAuthProvider/NextAuthProvider'
import RecoilRootProvider from '@/components/providers/RecoilRootProvider/RecoilRootProvider'
import TanstackProvider from '@/components/providers/TanstackProvider/TanstackProvider'
import UserDataProvider from '@/components/providers/UserDataProvider/UserDataProvider'

const Pretendard = localFont({
  src: [
    {
      path: 'fonts/Pretendard/Pretendard-Regular.subset.woff2',
      weight: '400',
    },
    {
      path: 'fonts/Pretendard/Pretendard-Medium.subset.woff2',
      weight: '500',
    },
    {
      path: 'fonts/Pretendard/Pretendard-SemiBold.subset.woff2',
      weight: '600',
    },
    {
      path: 'fonts/Pretendard/Pretendard-Bold.subset.woff2',
      weight: '700',
    },
  ],
})

export const metadata: Metadata = {
  title: '파티지지 - pati.gg',
  description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${Pretendard.className}`}>
        <TanstackProvider>
          <RecoilRootProvider>
            <NextAuthProvider>
              <UserDataProvider />
            </NextAuthProvider>
            <div className="min-w-[1200px]">
              <Header />
              <div className="min-h-[80vh]">{children}</div>
              <Footer />
              <Modal />
            </div>
          </RecoilRootProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}

export default RootLayout
