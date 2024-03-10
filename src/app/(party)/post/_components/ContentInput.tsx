'use client'

import { useEffect, useState } from 'react'

interface ContentInputProps {
  placeholder?: string
  onChange: (content: string) => void
}

const ContentInput = ({ placeholder, onChange }: ContentInputProps) => {
  const [content, setContent] = useState('')

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value.slice(0, 400)
    setContent(newContent)
  }

  useEffect(() => {
    if (placeholder) {
      setContent(placeholder)
    }
  }, [placeholder])

  useEffect(() => {
    onChange(content)
  }, [content, onChange])

  return (
    <div className="card-border card-bg">
      <textarea
        onChange={onTextAreaChange}
        className="h-[300px] w-full px-5 py-4 resize-none bg-transparent"
        placeholder="욕설 및 비방 또는 과도한 홍보 및 상업적인 내용은 제재 대상이 될 수 있습니다."
        value={content}
      />
      <div className="w-full flex justify-end pr-5 pb-3 text-[#9BA3AF] text-sm">
        {content.length}/400
      </div>
    </div>
  )
}

export default ContentInput
