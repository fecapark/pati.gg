'use client'

import Tag from '@/components/shared/Tag/Tag'

import SearchResult from './SearchResult'
import useSearchQueryParams from './useSearchQueryParams'

const SearchContainer = () => {
  const { params, isValid } = useSearchQueryParams()

  if (!isValid) {
    return (
      <div className="max-w-[900px] w-full mx-auto">
        <div className="w-full flex flex-col items-center">잘못된 검색 쿼리입니다.</div>
      </div>
    )
  }

  return (
    <div className="max-w-[900px] w-full mx-auto">
      <div className="w-full flex flex-col items-center">
        <div className="w-full pt-12 flex-center flex-col mb-16">
          <div className="font-medium text-4xl mb-2">검색 결과</div>
          <div className="text-[#c3c3c5] mb-6">검색된 파티글들을 최신순으로 정렬했어요.</div>
          <div className="flex gap-3">
            {Object.entries(params).map(([key, value]) => {
              if (!value) return null
              return <Tag key={key} name={value} big />
            })}
          </div>
        </div>
        <SearchResult params={params} />
      </div>
    </div>
  )
}

export default SearchContainer
