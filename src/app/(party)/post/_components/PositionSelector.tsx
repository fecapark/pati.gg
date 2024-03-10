'use client'

import { useEffect, useState } from 'react'

import deepcopy from 'deepcopy'
import { MdAdd } from 'react-icons/md'

import PositionInfoMaker from '@/components/layouts/Modal/contents/PositionInfoMaker'
import PositionTableMaker from '@/components/layouts/Modal/contents/PositionTableMaker'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import useModal from '@/hooks/useModal'
import { UserPositionInfo } from '@/types/post'

interface PositionSelectorProps {
  placeholder?: Record<number, UserPositionInfo[]>
  onChange: (positions: UserPositionInfo[][]) => void
}

const PositionItem = ({
  data,
  onChange,
}: {
  data: UserPositionInfo
  onChange: ({ job, level }: { job: string; level: number }) => void
}) => {
  const setPositionInfoModal = useModal({
    title: '캐릭터의 정보를 입력해주세요',
    content: (
      <PositionInfoMaker
        placeholder={{ job: data.job, level: data.level }}
        onSubmit={({ job, level }) => {
          setPositionInfoModal(false)
          onChange({ job, level })
        }}
      />
    ),
  })

  if (data.level === null || data.job === null) {
    return (
      <div
        className="card-bg card-border flex-center flex-col text-[#9BA3AF] py-4 hover:card-hover cursor-pointer"
        onClick={() => setPositionInfoModal(true)}
      >
        <IconWrapper className="p-2 rounded-[50%] border-[#9BA3AF] text-3xl">
          <MdAdd />
        </IconWrapper>
      </div>
    )
  }

  return (
    <div
      className="card-bg card-border flex-center hover:card-hover cursor-pointer"
      onClick={() => setPositionInfoModal(true)}
    >
      <div className="flex-center flex-col">
        <span className="text-sm font-semibold mb-1">{data.job}</span>
        <span className="text-sm font-medium text-[#b2b2b5]">Lv. {data.level}</span>
      </div>
    </div>
  )
}

const EmptyPosition = () => {
  return (
    <div className="flex-center flex-col px-5 py-9 cursor-pointer">
      <IconWrapper className="p-3 rounded-[50%] border-[1px] border-[#9BA3AF] text-2xl text-[#9BA3AF] mb-4">
        <MdAdd />
      </IconWrapper>
      <span className="text-[#9BA3AF]">맵 지형에 따른 유저의 위치를 지정해주세요</span>
    </div>
  )
}

const PositionSelector = ({ placeholder, onChange }: PositionSelectorProps) => {
  const [positions, setPositions] = useState<UserPositionInfo[][]>([])

  const makeEmptyTable = (row: number, col: number) => {
    const newTable: UserPositionInfo[][] = []
    for (let i = 0; i < row; i += 1) {
      const newRow: UserPositionInfo[] = new Array(col).fill({ level: null, job: null })
      newTable.push(newRow)
    }
    return newTable
  }

  const setPositionTableModal = useModal({
    title: '맵 지형을 표로 만들어주세요',
    content: (
      <PositionTableMaker
        onSubmit={({ row, col }) => {
          setPositionTableModal(false)
          setPositions(makeEmptyTable(row, col))
        }}
      />
    ),
  })

  useEffect(() => {
    if (placeholder) {
      const newPlaceholder: UserPositionInfo[][] = []
      Object.entries(placeholder)
        .sort(([a], [b]) => Number(a) - Number(b))
        .forEach(([, value]) => {
          newPlaceholder.push(value)
        })
      setPositions(newPlaceholder)
    }
  }, [placeholder])

  useEffect(() => {
    onChange(positions)
  }, [onChange, positions])

  if (positions.length === 0) {
    return (
      <div
        className="card-bg card-border hover:card-hover"
        onClick={() => setPositionTableModal(true)}
      >
        <EmptyPosition />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div
        className="w-full gap-2"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${positions[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${positions.length}, minmax(100px, 1fr))`,
        }}
      >
        {positions.map((row, i) =>
          row.map((col, j) => (
            <PositionItem
              key={`${i}-${j}`}
              data={col}
              onChange={({ job, level }) => {
                setPositions((prev) => {
                  const newPositions = deepcopy(prev)
                  newPositions[i][j] = { job, level }
                  return newPositions
                })
              }}
            />
          ))
        )}
      </div>
      <div className="w-full">
        <button
          className="card-border bg-[#1f1f22] hover:card-hover py-3 px-5 mt-3 w-full text-sm text-[#9BA3AF]"
          type="button"
          onClick={() => setPositionTableModal(true)}
        >
          맵 지형 수정하기
        </button>
      </div>
    </div>
  )
}

export default PositionSelector
