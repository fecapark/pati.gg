'use client'

import { useEffect, useState } from 'react'

import { RecruitType } from '@/types/tag'

interface RecruitSelectorProps {
  placeholder?: RecruitType
  onChange: (recruitType: RecruitType) => void
}

const RecruitButton = ({
  text,
  selected,
  onClick,
}: {
  text: string
  selected: boolean
  onClick: () => void
}) => {
  return (
    <div
      onClick={() => {
        if (selected) return
        onClick()
      }}
      className={`rounded-md ${selected ? 'bg-[#404042]' : 'hover:bg-[#323236] cursor-pointer text-[#9BA3AF]'} font-medium text-sm py-2 px-4`}
    >
      {text}
    </div>
  )
}

const RecruitSelector = ({ placeholder, onChange }: RecruitSelectorProps) => {
  const [recruitType, setRecruitType] = useState<'구인' | '구직' | null>(null)

  useEffect(() => {
    setRecruitType(placeholder ?? null)
  }, [placeholder])

  useEffect(() => {
    if (recruitType === null) return
    onChange(recruitType)
  }, [recruitType, onChange])

  return (
    <div className="flex card-bg card-border w-fit p-1">
      <RecruitButton
        text="구인"
        selected={recruitType === '구인'}
        onClick={() => {
          setRecruitType('구인')
        }}
      />
      <RecruitButton
        text="구직"
        selected={recruitType === '구직'}
        onClick={() => {
          setRecruitType('구직')
        }}
      />
    </div>
  )
}

export default RecruitSelector
