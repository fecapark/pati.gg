'use client'

import { useMemo } from 'react'

import { FaBoxOpen } from 'react-icons/fa'

import PartyItem from '@/components/shared/Party/PartyItem'
import PartySkeleton from '@/components/shared/Party/PartySkeleton'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import { getSepecificUserParties } from '@/server/party/party'

import usePartiesInfiniteQuery from '../../../../../hooks/usePartiesInfiniteQuery'
import useProfileId from '../_hooks/useProfileId'

const UserPartiesLoader = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <PartySkeleton />
      <PartySkeleton />
      <PartySkeleton />
      <PartySkeleton />
      <PartySkeleton />
    </div>
  )
}

const EmptyPartyCard = () => {
  return (
    <div className="w-full flex-center card-border card-bg flex-col px-6 py-8 text-[#a0a0a0]">
      <IconWrapper className="text-6xl mb-3">
        <FaBoxOpen />
      </IconWrapper>
      <span className="text-[15px] text-center">
        모집을 요청한 파티 글이 없어요.
        <br />
        한번 모집해보실래요?
      </span>
    </div>
  )
}

const UserWrittenParties = () => {
  const profileId = useProfileId()

  const { datas, isFetchingNextPage, initialLoading, fetchRef } = usePartiesInfiniteQuery({
    queryKey: ['profile-parties', profileId],
    queryFn: (pageParam) => getSepecificUserParties(profileId, 5, pageParam),
    pagingSize: 5,
  })

  const content = useMemo(() => {
    if (initialLoading) return <UserPartiesLoader />
    if (datas.length === 0 && !isFetchingNextPage) return <EmptyPartyCard />
    return datas.map((party) => <PartyItem key={party.id} partyData={party} />)
  }, [datas, initialLoading, isFetchingNextPage])

  return (
    <div className="w-full">
      <div className="mb-6 w-full flex justify-between items-center">
        <div className="flex-center">
          <span className="text-2xl font-semibold">모집 요청한 파티들</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        {content}
        {isFetchingNextPage ? null : <div className="w-full" ref={fetchRef} />}
      </div>
    </div>
  )
}

export default UserWrittenParties
