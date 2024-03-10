'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'
import { MdArrowForward } from 'react-icons/md'
import { useSetRecoilState } from 'recoil'

import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import { isSearchActiveAtom } from '@/shared/atom'
import { searchTags, tags } from '@/shared/const'
import { BaseTagData } from '@/types/tag'
import { sample } from '@/utils/random'

import Tag from '../Tag/Tag'

interface SearchResultProps {
  text: string
  searchedDatas: BaseTagData[]
  selectedDatas: BaseTagData[]
  focusedIndex: number
  noSearchButton?: boolean
  ignores?: string[]
  noPreviewContent?: boolean
  onSearchedTagClick: (tag: BaseTagData) => void
}

const CountSeperator = ({ hidden = false }: { hidden?: boolean }) => {
  if (hidden) return null
  return <div className="w-[3px] h-[3px] rounded-[5px] bg-[#b2b2b5]" />
}

const CountViewer = ({
  title,
  count,
  hidden = false,
  noSeperator = false,
}: {
  title: string
  count: number
  hidden?: boolean
  noSeperator?: boolean
}) => {
  if (hidden) return null

  return (
    <>
      <CountSeperator hidden={noSeperator} />
      <span className={`${count >= 1 ? 'text-accent-red' : ''}`}>
        #{title} {count}/1
      </span>
    </>
  )
}

const SelectedCountContainer = ({
  selectedDatas,
  ignores = [],
}: {
  selectedDatas: BaseTagData[]
  ignores?: string[]
}) => {
  const tagCounts = useMemo(() => {
    const counts = {
      사냥터: 0,
      역할: 0,
      운용방식: 0,
      구인구직: 0,
    }

    selectedDatas.forEach((tag) => {
      if (tag.section === '사냥터') counts.사냥터 += 1
      if (tag.section === '파티퀘스트') counts.사냥터 += 1
      if (tag.section === '역할') counts.역할 += 1
      if (tag.section === '운용방식') counts.운용방식 += 1
      if (tag.section === '구인구직') counts.구인구직 += 1
    })

    return counts
  }, [selectedDatas])

  return (
    <div className="px-5 pb-3 flex flex-wrap gap-2 items-center text-xs text-accent-green font-semibold sticky top-0 card-bg">
      <CountViewer
        title="사냥터&파티퀘스트"
        count={tagCounts.사냥터}
        hidden={ignores.includes('사냥터') || ignores.includes('파티퀘스트')}
        noSeperator
      />
      <CountViewer title="역할" count={tagCounts.역할} hidden={ignores.includes('역할')} />
      <CountViewer
        title="운용방식"
        count={tagCounts.운용방식}
        hidden={ignores.includes('운용방식')}
      />
      <CountViewer
        title="구인구직"
        count={tagCounts.구인구직}
        hidden={ignores.includes('구인구직')}
      />
    </div>
  )
}

const SearchResultContent = ({
  text,
  searchedDatas,
  focusedIndex,
  noPreviewContent,
  onSearchedTagClick,
}: {
  text: string
  searchedDatas: BaseTagData[]
  focusedIndex: number
  noPreviewContent: boolean
  onSearchedTagClick: (tag: BaseTagData) => void
}) => {
  const [randomPlaceNames, setRandomPlaceNames] = useState<string[]>([])

  useEffect(() => {
    setRandomPlaceNames(sample(tags.places, 5).map((tag) => tag.name))
  }, [])

  if (text === '' && searchedDatas.length === 0) {
    if (noPreviewContent) return null
    return (
      <div className="px-5 py-6 text-sm text-[#e0e0e0] grid grid-cols-4">
        <div>
          <h1 className="text-xl font-semibold mb-3">
            # 사냥터 <span className="text-[15px]">({tags.places.length})</span>
          </h1>
          <div className="flex flex-col gap-2">
            {randomPlaceNames.map((name) => (
              <Tag name={name} big />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-3">
            # 역할 <span className="text-[15px]">({tags.role.length})</span>
          </h1>
          <div className="flex flex-col gap-2">
            {tags.role.map((tag) => (
              <Tag name={tag.name} big />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-3">
            # 운용방식 <span className="text-[15px]">({tags.methods.length})</span>
          </h1>
          <div className="flex flex-col gap-2">
            {tags.methods.map((tag) => (
              <Tag name={tag.name} big />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-3">
            # 구인구직 <span className="text-[15px]">({tags.role.length})</span>
          </h1>
          <div className="flex flex-col gap-2">
            {searchTags.recruit.map((tag) => (
              <Tag name={tag.name} big />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (searchedDatas.length === 0)
    return (
      <div className="px-5 py-6 flex-center text-[#b2b2b5] font-medium text-[15px]">
        검색된 태그가 없어요.
      </div>
    )

  return searchedDatas.map((tag, i) => (
    <div
      onClick={() => onSearchedTagClick(tag)}
      className={`search-result flex px-5 py-2 hover:bg-[#303032] cursor-pointer ${focusedIndex === i ? 'bg-[#303032] key-focused' : ''}`}
    >
      <Tag name={tag.name} key={tag.name} big />
    </div>
  ))
}

const SearchResult = ({
  text,
  searchedDatas,
  selectedDatas,
  focusedIndex,
  ignores = [],
  noSearchButton = false,
  noPreviewContent = false,
  onSearchedTagClick,
}: SearchResultProps) => {
  const router = useRouter()
  const setIsActive = useSetRecoilState(isSearchActiveAtom)
  const scrollRef = useRef<HTMLDivElement>(null)

  const onSearch = () => {
    const query: string[] = []

    selectedDatas.forEach((tag) => {
      if (tag.section === '사냥터') query.push(`place=${tag.name}`)
      if (tag.section === '파티퀘스트') query.push(`place=${tag.name}`)
      if (tag.section === '역할') query.push(`role=${tag.name}`)
      if (tag.section === '운용방식') query.push(`method=${tag.name}`)
      if (tag.section === '구인구직') query.push(`recruit=${tag.name}`)
    })

    router.push(`/search?${query.join('&')}`)
    setIsActive(false)
  }

  useEffect(() => {
    scrollRef.current?.querySelector('.key-focused')?.scrollIntoView({
      behavior: 'instant',
      block: 'nearest',
    })
  }, [focusedIndex])

  return (
    <>
      <div
        className="pb-3 flex flex-col max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#626265] scrollbar-track-transparent"
        ref={scrollRef}
      >
        <SelectedCountContainer selectedDatas={selectedDatas} ignores={ignores} />
        <SearchResultContent
          text={text}
          focusedIndex={focusedIndex}
          searchedDatas={searchedDatas}
          onSearchedTagClick={onSearchedTagClick}
          noPreviewContent={noPreviewContent}
        />
      </div>
      {noSearchButton ? null : (
        <div className="px-5 pb-3 flex items-center justify-end">
          <button
            className={`search-button ${selectedDatas.length === 0 ? 'rounded-lg bg-[#27272a] text-[#a0a0a0] border-[1px] border-[#27272a]' : 'card-border card-bg hover:card-hover cursor-pointer'} px-5 py-2 text-sm flex-center gap-2`}
            style={{
              transition: '0.15s cubic-bezier(0.2, 0, 0, 1)',
            }}
            type="button"
            disabled={selectedDatas.length === 0}
            onClick={onSearch}
          >
            <span>검색</span>
            <IconWrapper className="text-lg">
              <MdArrowForward />
            </IconWrapper>
          </button>
        </div>
      )}
    </>
  )
}

export default SearchResult
