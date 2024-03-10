import { Metadata } from 'next'

import RecentPartyListItems from './_components/RecentPartyListItems'

export const metadata: Metadata = {
  title: '최신 파티글 - 파티지지 pati.gg',
  description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
}

const RecentPartiesPage = () => {
  return (
    <div className="max-w-[900px] w-full mx-auto">
      <div className="w-full flex flex-col items-center">
        <div className="w-full pt-12 flex-center flex-col mb-16">
          <div className="font-medium text-4xl mb-2">최신 파티글</div>
          <div className="text-[#c3c3c5]">작성된 모든 파티글들을 최신순으로 정렬했어요.</div>
        </div>
        <RecentPartyListItems />
      </div>
    </div>
  )
}

export default RecentPartiesPage
