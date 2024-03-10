'use client'

import PartyItem from '@/components/shared/Party/PartyItem'
import PartySkeleton from '@/components/shared/Party/PartySkeleton'
import usePartiesInfiniteQuery from '@/hooks/usePartiesInfiniteQuery'
import { getPaginatedRecentParties } from '@/server/party/party'

const RecentPartyListItems = () => {
  const { datas, fetchRef, initialLoading, isFetchingNextPage } = usePartiesInfiniteQuery({
    queryKey: ['recent-parties', 'recent-page'],
    queryFn: (pageParam) => getPaginatedRecentParties(10, pageParam),
    pagingSize: 10,
  })

  if (initialLoading)
    return (
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4">
        <PartySkeleton />
        <PartySkeleton />
        <PartySkeleton />
        <PartySkeleton />
        <PartySkeleton />
        <PartySkeleton />
        <PartySkeleton />
        <PartySkeleton />
        <PartySkeleton />
        <PartySkeleton />
      </div>
    )

  return (
    <>
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4">
        {datas.map((party) => (
          <PartyItem key={`${party.id}/recentpage`} partyData={party} />
        ))}
      </div>
      {isFetchingNextPage ? null : <div ref={fetchRef} />}
    </>
  )
}

export default RecentPartyListItems
