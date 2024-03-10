'use client'

import { useEffect, useMemo, useState } from 'react'

import Select from 'react-select'

import { jobOptions } from '@/shared/const'

interface PositionInfoMakerProps {
  placeholder: { job: string | null; level: number | null }
  onSubmit: ({ job, level }: { job: string; level: number }) => void
}

const PositionInfoMaker = ({ placeholder, onSubmit }: PositionInfoMakerProps) => {
  const [job, setJob] = useState<string | null>(null)
  const [level, setLevel] = useState<number | null>(null)

  const isLevelValid = level !== null && level > 0
  const canSubmit = isLevelValid && job !== null

  const jobSelectValue = useMemo(() => {
    if (!job) return []
    return jobOptions.filter(({ label }) => label === job)
  }, [job])

  const onMake = () => {
    if (!canSubmit) return
    onSubmit({ job, level })
    setJob(null)
    setLevel(null)
  }

  const onLevelChange = (e: React.ChangeEvent) => {
    const changedLevel = parseInt((e.target as HTMLInputElement).value, 10)
    setLevel(Math.max(1, Math.min(changedLevel, 200)))
  }

  useEffect(() => {
    setJob(placeholder.job)
    setLevel(placeholder.level)
  }, [placeholder])

  return (
    <div className="pt-6">
      <div className="flex flex-col gap-1 w-full mb-10">
        <span className="text-[15px] font-medium text-[#d2d2d6] mb-2">캐릭터 직업</span>
        <Select
          options={jobOptions}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: '1px solid #626266',
              borderColor: state.isFocused ? '#2d7ceb' : '#626266',
              borderRadius: '0.5em',
              backgroundColor: '#1f1f22',
            }),
            singleValue: (baseStyles) => ({ ...baseStyles, color: 'white' }),
            menu: (baseStyles) => ({
              ...baseStyles,
              border: '1px solid #626266',
              borderRadius: '0.5em',
              backgroundColor: '#1f1f22',
            }),
            menuList: (baseStyles) => ({ ...baseStyles, maxHeight: '120px' }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isSelected ? '#2d7ceb' : 'transparent',
              paddingTop: '0.75em',
              paddingBottom: '0.75em',
            }),
            container: (baseStyles) => ({ ...baseStyles }),
          }}
          onChange={(value) => setJob(value?.label ?? null)}
          value={jobSelectValue}
          placeholder="캐릭터 직업을 선택하세요..."
        />
      </div>
      <div className="flex flex-col gap-1 w-full mb-10">
        <span className="text-[15px] font-medium text-[#d2d2d6] mb-1">캐릭터 레벨</span>
        <input
          type="number"
          value={level ?? 0}
          min={1}
          max={200}
          onChange={onLevelChange}
          className={`w-full pb-1 pl-1 font-medium bg-transparent border-b-2 ${isLevelValid ? 'border-accent-blue' : 'border-[#323238]'} focus:border-accent-blue`}
          style={{ transition: 'border-color 0.15s cubic-bezier(0.2, 0, 0, 1)' }}
        />
      </div>
      <div className="w-full flex-center">
        <button
          className={`px-6 py-2 bg-accent-blue rounded-md font-medium ${canSubmit ? '' : 'opacity-50'}`}
          type="button"
          onClick={onMake}
          disabled={!canSubmit}
        >
          입력하기
        </button>
      </div>
    </div>
  )
}

export default PositionInfoMaker
