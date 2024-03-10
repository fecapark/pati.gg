'use client'

import { useState } from 'react'

interface PositionTableMakerProps {
  onSubmit: ({ row, col }: { row: number; col: number }) => void
}

interface RowColInputProps {
  label: string
  onChange: (value: number) => void
}

const RowColInput = ({ label, onChange }: RowColInputProps) => {
  const [value, setValue] = useState(2)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Math.max(Math.min(parseInt(e.target.value, 10), 6), 1)
    setValue(inputValue)
    onChange(inputValue)
  }

  return (
    <div className="card-border flex w-[100px]">
      <div className="py-2 px-5 font-semibold">{label}</div>
      <input
        type="number"
        className="bg-transparent flex-1 pr-2"
        placeholder={label}
        onChange={onInputChange}
        value={value}
        min={1}
        max={6}
      />
    </div>
  )
}

const PositionTableMaker = ({ onSubmit }: PositionTableMakerProps) => {
  const [row, setRow] = useState(2)
  const [col, setCol] = useState(2)

  const onMake = () => {
    onSubmit({ row, col })
  }

  return (
    <>
      <p className="mb-5">각 칸은 각 플레이어가 사냥하게 될 자리에요.</p>
      <div className="w-full flex-center flex-col">
        <div
          className="gap-2 mb-4 w-[280px]"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${col}, 1fr)`,
            gridTemplateRows: `repeat(${row}, 30px)`,
          }}
        >
          {Array.from({ length: row * col }, (_, i) => i + 1).map((v) => (
            <div key={v} className="rounded-sm bg-[#323233] flex-center" />
          ))}
        </div>
        <div className="flex gap-2 mb-6">
          <RowColInput label="행" onChange={(value) => setRow(value)} />
          <RowColInput label="열" onChange={(value) => setCol(value)} />
        </div>
        <div>
          <button
            className="px-6 py-2 bg-accent-blue rounded-md font-medium"
            type="button"
            onClick={onMake}
          >
            만들기
          </button>
        </div>
      </div>
    </>
  )
}

export default PositionTableMaker
