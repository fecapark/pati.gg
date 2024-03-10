'use client'

import 'react-tooltip/dist/react-tooltip.css'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Tooltip } from 'react-tooltip'

import { getRecentParties } from '@/server/party/party'

import PartyItem from '../../../../components/shared/Party/PartyItem'
import PartyListSuspense from '../../../../components/shared/Party/PartyListSuspense'

const RecentPartyListItems = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['recent-parties', 'root'],
    queryFn: () => getRecentParties(6),
  })

  return data.map((party) => <PartyItem key={`${party.id}/recenthome`} partyData={party} />)
}

const RecentPartyContainer = () => {
  return (
    <div className="mb-20">
      <PartyListSuspense
        wrapperClassName="grid grid-cols-2 gap-x-2 gap-y-4"
        title={
          <div className="flex gap-3 items-center">
            <span>최신 파티글</span>
            <div className="flex-center">
              <a className="event-tooltip text-base bg-accent-blue rounded-md px-2">EVENT</a>
              <div className="text-base font-medium">
                <Tooltip anchorSelect=".event-tooltip" place="top">
                  24년 3월 25일까지 파티글 작성 시, 추첨 30명에게 스벅 기프티콘을 드립니다 (추첨 시
                  별도 공지 예정). <br />
                </Tooltip>
              </div>
            </div>
          </div>
        }
        maxChildrenCount={6}
        moreHref="/recent"
      >
        <RecentPartyListItems />
      </PartyListSuspense>
    </div>
  )
}

export default RecentPartyContainer
