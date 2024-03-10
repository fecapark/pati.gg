'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { IoMdAlert } from 'react-icons/io'
import { MdCheck } from 'react-icons/md'
import { Oval } from 'react-loader-spinner'

import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import useTagAuth from '@/hooks/useTagAuth'
import { TagResponseData } from '@/types/tag'

interface TagAuthInputProps {
  setMapleWorldData: Dispatch<SetStateAction<{ tag: string; name: string }>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const AuthResult = ({
  data: { name, success, playedMapleland },
  isLoading,
}: {
  data: TagResponseData
  isLoading: boolean
}) => {
  if (success === null && !isLoading) return null

  if (isLoading) {
    return (
      <div className="mt-3 text-[#d2d2d5] text-sm">
        <span className="pl-3">잠시만요... 인증에는 대략 10초 정도 걸려요.</span>
      </div>
    )
  }

  if (success === false) {
    return (
      <div className="mt-3 text-accent-red text-sm flex items-center gap-1">
        <IconWrapper className="text-lg">
          <IoMdAlert />
        </IconWrapper>
        <span>해당 태그에 맞는 유저를 찾을 수 없어요.</span>
      </div>
    )
  }

  if (!playedMapleland) {
    return (
      <div className="mt-3 text-accent-red text-sm flex items-center gap-1">
        <IconWrapper className="text-lg">
          <IoMdAlert />
        </IconWrapper>
        <span>메이플랜드를 플레이하지 않는 유저는 인증할 수 없어요.</span>
      </div>
    )
  }

  return (
    <div className="mt-3 text-accent-green text-sm flex items-center gap-1">
      <IconWrapper className="text-lg">
        <MdCheck />
      </IconWrapper>
      <div>
        <span className=" font-bold">{name}</span>
        <span>님 맞으신가요? 이 정보로 저장할게요.</span>
      </div>
    </div>
  )
}

const TagAuthInput = ({ setMapleWorldData, setIsAuthenticated }: TagAuthInputProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [tag, setTag] = useState('')
  const { data, isLoading, auth: tagAuth } = useTagAuth()

  const onChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setTag(target.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const preprocessedTag = tag.replaceAll('#', '')

    setTag(preprocessedTag)
    tagAuth(preprocessedTag)
  }

  const alerting =
    !isLoading && (data.success === false || (data.success !== null && !data.playedMapleland))

  useEffect(() => {
    const { success, playedMapleland } = data

    if (success === true && playedMapleland) {
      setIsAuthenticated(true)
      setMapleWorldData({
        tag: tag.trim(),
        name: data.name.trim(),
      })
    } else {
      setIsAuthenticated(false)
      ref.current?.focus()
    }
  }, [tag, data, setIsAuthenticated, setMapleWorldData])

  return (
    <div className="pt-3 pb-3 w-full">
      <form className="flex items-center gap-2" onSubmit={onSubmit}>
        <div
          className={`bg-[#323236] rounded-lg flex p-1 border-2 w-[120px] ${alerting ? 'border-accent-red' : 'border-[#323236]'} ${isLoading ? 'brightness-75' : ''}`}
        >
          <div className="select-none w-7 h-7 text-[#c2c2c2] font-semibold flex-center rounded-lg text-lg">
            #
          </div>
          <input
            ref={ref}
            className="bg-transparent text-[#e0e0e0] flex-1 w-full pr-4 font-bold "
            onChange={onChange}
            disabled={isLoading}
            value={tag}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-5 h-9 ${isLoading ? 'bg-[#424245]' : 'bg-white hover:bg-[#e0e0e0]'} font-semibold text-[#121214] text-sm rounded-md`}
          style={{ transition: 'background-color 0.2s cubic-bezier(0.2, 0, 0, 1)' }}
        >
          {isLoading ? (
            <Oval
              width={20}
              height={20}
              color="#e0e0e0"
              secondaryColor="#ffffff00"
              strokeWidth={4}
            />
          ) : (
            '인증'
          )}
        </button>
      </form>
      <AuthResult data={data} isLoading={isLoading} />
    </div>
  )
}

export default TagAuthInput
