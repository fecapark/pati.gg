'use client'

import { Dispatch, SetStateAction } from 'react'

import { MdSearch } from 'react-icons/md'

import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'

interface SearchTriggerProps {
  setIsActive: Dispatch<SetStateAction<boolean>>
}

const SearchTrigger = ({ setIsActive }: SearchTriggerProps) => {
  return (
    <div
      className="search-trigger select-none card-bg card-border px-3 py-1 flex items-center text-[#c2c2c6] cursor-pointer hover:card-hover"
      onClick={() => setIsActive(true)}
    >
      <div className="p-1 flex-center mr-2">
        <IconWrapper className="text-2xl">
          <MdSearch />
        </IconWrapper>
      </div>
      <div className="pr-5">
        <span className="text-sm">
          <span className="bg-[#5B2E42] text-[#f0f0f0] px-[12px] py-1 text-sm font-medium rounded-[4px]">
            다양한
          </span>
          <span className="ml-2 bg-[#505050] text-[#f0f0f0] px-[12px] py-1 text-sm font-medium rounded-[4px]">
            태그
          </span>
          <span className="ml-2">로 더 복잡한 검색하기...</span>
        </span>
      </div>
    </div>
  )
}

export default SearchTrigger
