'use client'

import { useMemo } from 'react'

import { searchTags, tags } from '@/shared/const'
import { BaseTagData } from '@/types/tag'

interface TagProps {
  name: string
  big?: boolean
}

const Tag = ({ name, big = false }: TagProps) => {
  const tagDatas = useMemo(() => {
    const allTags: BaseTagData[] = [
      ...Object.values(tags).flat(),
      ...Object.values(searchTags).flat(),
    ]

    const findedTag = allTags.find((tag) => tag.name === name)
    return findedTag
  }, [name])

  if (!tagDatas) return null

  return (
    <div
      className={`bg-[#e0e0e0] text-black px-[12px] py-1 ${big ? 'text-sm' : 'text-xs'} font-medium rounded-[4px] w-max`}
      style={{
        backgroundColor: tagDatas.color,
        color: '#f0f0f0',
      }}
    >
      {name}
    </div>
  )
}

export default Tag
