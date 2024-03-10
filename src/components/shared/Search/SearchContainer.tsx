'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { BaseTagData } from '@/types/tag'
import { searchTagDatas } from '@/utils/search'

import SearchBar from './SearchBar'
import SearchResult from './SearchResult'

interface SearchContainerProps {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
}

const SearchContainer = ({ isActive, setIsActive }: SearchContainerProps) => {
  const [text, setText] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [searchedDatas, setSearchedDatas] = useState<BaseTagData[]>([])
  const [selectedDatas, setSelectedDatas] = useState<BaseTagData[]>([])

  const removeLastTag = () => {
    setSelectedDatas((prev) => prev.slice(0, -1))
  }

  const limitFocusedIndexOutOfRange = (offset: number) => {
    setFocusedIndex((prev) => Math.max(0, Math.min(prev + offset, searchedDatas.length - 1)))
  }

  const resetSearch = () => {
    setText('')
    setFocusedIndex(0)
    setSearchedDatas([])
  }

  const validateTagSectionUnique = (section: string) => {
    const placeTagCount = selectedDatas.filter((tag) => tag.section === '사냥터').length
    const roleTagCount = selectedDatas.filter((tag) => tag.section === '역할').length
    const methodTagCount = selectedDatas.filter((tag) => tag.section === '운용방식').length
    const partyQuestTagCount = selectedDatas.filter((tag) => tag.section === '파티퀘스트').length
    const recruitTagCount = selectedDatas.filter((tag) => tag.section === '구인구직').length

    const canPushPlaceOrPartyQuest = placeTagCount + partyQuestTagCount < 1
    const canPushRole = roleTagCount < 1
    const canPushMethod = methodTagCount < 1
    const canPushRercuit = recruitTagCount < 1

    if (section === '사냥터' || section === '파티퀘스트') return canPushPlaceOrPartyQuest
    if (section === '역할') return canPushRole
    if (section === '운용방식') return canPushMethod
    if (section === '구인구직') return canPushRercuit
    return false
  }

  const pushFocusedTag = () => {
    if (searchedDatas.length === 0) return
    const focusedData = searchedDatas[focusedIndex]
    if (!validateTagSectionUnique(focusedData.section)) return
    setSelectedDatas((prev) => {
      if (prev.some((tag) => tag.name === focusedData.name)) return prev
      return [...prev, focusedData]
    })
  }

  const pushSepcificTag = (tag: BaseTagData) => {
    if (!validateTagSectionUnique(tag.section)) return
    setSelectedDatas((prev) => {
      if (prev.some((t) => t.name === tag.name)) return prev
      return [...prev, tag]
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setFocusedIndex(0)
    setSearchedDatas(searchTagDatas(e.target.value))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return

    if (e.key === 'Backspace') {
      if (text !== '') return
      e.preventDefault()
      removeLastTag()
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      limitFocusedIndexOutOfRange(1)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      limitFocusedIndexOutOfRange(-1)
      return
    }

    if (e.key === 'Enter') {
      if (e.repeat) return
      e.preventDefault()
      pushFocusedTag()
      resetSearch()
    }
  }

  const onSearchedTagClick = (tag: BaseTagData) => {
    pushSepcificTag(tag)
    resetSearch()
  }

  const onBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === null) return
    if (e.target instanceof Element === false) return

    if (e.target.closest('.search-button')) {
      setIsActive(false)
      resetSearch()
      setSelectedDatas([])
      return
    }

    if (e.target.closest('.search-container')) {
      setIsActive(true)
      return
    }

    if (e.target.closest('.search-trigger')) {
      setIsActive(true)
      return
    }

    setIsActive(false)
  }

  if (!isActive) return null

  return (
    <div className="fixed w-full h-[100vh] top-0 left-0 z-50">
      <div className="bg-[#00000066] w-full h-full backdrop-blur-[2px]" onClick={onBackgroundClick}>
        <div className="flex pt-20">
          <div className="search-container max-w-[600px] w-full flex flex-col mx-auto card-bg card-border">
            <SearchBar
              text={text}
              selectedDatas={selectedDatas}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
            <SearchResult
              text={text}
              searchedDatas={searchedDatas}
              selectedDatas={selectedDatas}
              onSearchedTagClick={onSearchedTagClick}
              focusedIndex={focusedIndex}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchContainer
