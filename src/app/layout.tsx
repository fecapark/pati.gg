import type { Metadata } from 'next'
import localFont from 'next/font/local'

import '@/styles/globals.css'
import RecoilRootProvider from '@/components/providers/RecoilRootProvider/RecoilRootProvider'
import TanstackProvider from '@/components/providers/TanstackProvider/TanstackProvider'

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
  title: '파티지지 - mlparty.gg',
  description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={Pretendard.className}>
        <TanstackProvider>
          <RecoilRootProvider>{children}</RecoilRootProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}

export default RootLayout
