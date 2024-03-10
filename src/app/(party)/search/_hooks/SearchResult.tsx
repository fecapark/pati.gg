'use client'

import { FaBoxOpen } from 'react-icons/fa'

import PartyItem from '@/components/shared/Party/PartyItem'
import PartySkeleton from '@/components/shared/Party/PartySkeleton'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import usePartiesInfiniteQuery from '@/hooks/usePartiesInfiniteQuery'
import { getSearchedParties } from '@/server/party/party'
import { MethodType, RoleType } from '@/types/tag'

interface SearchQueryParams {
  place: string | null
  role: RoleType | null
  method: MethodType | null
  recruit: '구인' | '구직' | null
}

const SearchLoading = () => {
  // PartySkeleton을 10번 반복한다
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {[...Array(10)].map((_, index) => {
        return <PartySkeleton key={index} />
      })}
    </div>
  )
}

const SearchResult = ({ params }: { params: SearchQueryParams }) => {
  const { datas, initialLoading, isFetchingNextPage, fetchRef } = usePartiesInfiniteQuery({
    queryKey: ['searched-parties', params],
    queryFn: (pageParam) => getSearchedParties(params, 10, pageParam),
    pagingSize: 10,
  })

  if (initialLoading) return <SearchLoading />

  if (datas.length === 0) {
    return (
      <div className="w-[340px] card-bg card-border flex-col flex-center py-6 text-[#a0a0a0]">
        <IconWrapper className="text-5xl mb-4">
          <FaBoxOpen />
        </IconWrapper>
        <div className="text-center">
          검색한 태그에 해당하는
          <br />
          파티 글이 없어요.
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-full grid grid-cols-2 gap-4">
        {datas.map((party) => {
          return <PartyItem key={party.id} partyData={party} />
        })}
      </div>
      {isFetchingNextPage ? null : <div className="w-full" ref={fetchRef} />}
    </>
  )
}

export default SearchResult
