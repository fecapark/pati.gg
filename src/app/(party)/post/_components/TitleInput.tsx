'use client'

import { useEffect, useState } from 'react'

interface TitleInputProps {
  placeholder?: string
  onChange: (title: string) => void
}

const TitleInput = ({ placeholder, onChange }: TitleInputProps) => {
  const [title, setTitle] = useState('')

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.slice(0, 20)
    setTitle(newTitle)
  }

  useEffect(() => {
    if (placeholder) {
      setTitle(placeholder)
    }
  }, [placeholder])

  useEffect(() => {
    onChange(title)
  }, [title, onChange])

  return (
    <div className="card-border card-bg py-4 px-5 flex items-end">
      <input
        className="w-full bg-transparent pr-5"
        value={title}
        onChange={onInputChange}
        placeholder="제목을 입력해주세요..."
      />
      <div className="text-sm text-[#9BA3AF]">{title.length}/20</div>
    </div>
  )
}

export default TitleInput
