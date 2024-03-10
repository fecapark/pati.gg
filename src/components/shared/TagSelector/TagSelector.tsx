'use client'

import { useEffect, useState } from 'react'

import { tags } from '@/shared/const'
import { BaseTagData, MethodType, RoleType } from '@/types/tag'
import { searchTagDatas } from '@/utils/search'

import SearchResult from '../Search/SearchResult'
import Tag from '../Tag/Tag'

interface TagSelectorProps {
  placeholder?: {
    place: string | null
    role: RoleType | null
    method: MethodType | null
  }
  onChange: (tags: BaseTagData[]) => void
  ignores?: string[]
}

const TagSelector = ({ placeholder, onChange: onTagChange, ignores = [] }: TagSelectorProps) => {
  const [isActive, setIsActive] = useState(false)
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

  useEffect(() => {
    if (placeholder) {
      const newTags: BaseTagData[] = []
      if (placeholder.place)
        newTags.push(
          [...tags.places, ...tags.partyquests].find(
            (tag) => tag.name === placeholder.place
          ) as BaseTagData
        )

      if (placeholder.role)
        newTags.push(tags.role.find((tag) => tag.name === placeholder.role) as BaseTagData)

      if (placeholder.method)
        newTags.push(tags.methods.find((tag) => tag.name === placeholder.method) as BaseTagData)

      setSelectedDatas(newTags)
    }
  }, [placeholder])

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
    setSearchedDatas(searchTagDatas(e.target.value, ignores))
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

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return

      if (e.target.closest('.tag-selector')) {
        setIsActive(true)
        return
      }

      if (e.target.closest('.search-result')) {
        setIsActive(true)
        return
      }

      setIsActive(false)
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    onTagChange(selectedDatas)
  }, [selectedDatas, onTagChange])

  return (
    <div className="tag-selector w-full">
      <div
        className={`card-bg py-4 relative ${isActive ? 'mb-[21px] border-t-[1px] border-l-[1px] border-r-[1px] border-b-[0px] rounded-t-lg rounded-b-none border-[#626266]' : 'card-border'}`}
      >
        <div className="flex flex-wrap gap-2 px-5">
          {selectedDatas.map((tag) => (
            <Tag name={tag.name} key={tag.name} big />
          ))}
          <input
            className="flex flex-1 min-w-[40px] bg-transparent"
            type="text"
            value={text}
            placeholder={
              isActive || selectedDatas.length === 0
                ? '파티 글에 해당되는 태그를 입력하세요...'
                : ''
            }
            onFocus={() => setIsActive(true)}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
        {isActive ? (
          <div
            className="shadow-[0px_24px_48px_rgba(0,0,0,0.6)] z-10 absolute left-[-1px] top-[100%] card-bg border-b-[1px] border-l-[1px] border-r-[1px] border-t-[0px] rounded-b-lg rounded-t-none border-[#626266]"
            style={{
              width: 'calc(100% + 2px)',
            }}
          >
            <SearchResult
              text={text}
              ignores={ignores}
              onSearchedTagClick={onSearchedTagClick}
              focusedIndex={focusedIndex}
              searchedDatas={searchedDatas}
              selectedDatas={selectedDatas}
              noSearchButton
              noPreviewContent
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TagSelector
