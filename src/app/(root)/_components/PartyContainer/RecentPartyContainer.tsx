'use client'

import 'react-tooltip/dist/react-tooltip.css'

import { useSuspenseQuery } from '@tanstack/react-query'

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
