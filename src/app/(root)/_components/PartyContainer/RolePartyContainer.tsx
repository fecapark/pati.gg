'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { getWorkOffRoleParties } from '@/server/party/party'
import { RoleType } from '@/types/tag'

import PartyItem from '../../../../components/shared/Party/PartyItem'
import PartyListSuspense from '../../../../components/shared/Party/PartyListSuspense'

const PartyListItems = ({ roleName }: { roleName: RoleType }) => {
  const { data } = useSuspenseQuery({
    queryKey: ['role-parties', roleName],
    queryFn: () => getWorkOffRoleParties(roleName),
  })

  if (data.length === 0)
    return (
      <div className="card-border card-bg h-[138px] px-4 flex-center flex-col">
        <span className="text-[17px] mb-3 font-semibold">첫 파티글의 주인공이 되어보세요!</span>
        <Link href="/post">
          <div className="bg-accent-blue py-2 px-5 rounded-md text-sm font-semibold">
            글 작성하기
          </div>
        </Link>
      </div>
    )

  return data.map((party) => <PartyItem key={`${party.id}/${roleName}/home`} partyData={party} />)
}

const RolePartyContainer = () => {
  return (
    <div className="grid grid-cols-2 w-full gap-x-8">
      <PartyListSuspense
        wrapperClassName="flex flex-col gap-4"
        title="나무꾼"
        maxChildrenCount={5}
        moreHref="/search?role=나무꾼"
      >
        <PartyListItems roleName="나무꾼" />
      </PartyListSuspense>
      <PartyListSuspense
        wrapperClassName="flex flex-col gap-4"
        title="설거지"
        maxChildrenCount={5}
        moreHref="/search?role=설거지"
      >
        <PartyListItems roleName="설거지" />
      </PartyListSuspense>
    </div>
  )
}

export default RolePartyContainer
