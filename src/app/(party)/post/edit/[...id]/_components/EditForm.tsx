'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

import TagSelector from '@/components/shared/TagSelector/TagSelector'
import { setPartyData } from '@/server/party/party'
import { DBPartyData } from '@/types/party'
import { UserPositionInfo } from '@/types/post'
import { BaseTagData, MethodType, RecruitType, RoleType } from '@/types/tag'

import ContentInput from '../../../_components/ContentInput'
import PositionSelector from '../../../_components/PositionSelector'
import RecruitSelector from '../../../_components/RecruitSelector'
import TitleInput from '../../../_components/TitleInput'

interface EditFormProps {
  placeholder: DBPartyData
  session: Session | null
}

const EditForm = ({ placeholder, session }: EditFormProps) => {
  const router = useRouter()
  const [recruitType, setRecruitType] = useState<RecruitType | null>(null)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<BaseTagData[]>([])
  const [content, setContent] = useState('')
  const [positions, setPositions] = useState<UserPositionInfo[][]>([])
  const [isPosting, setIsPosting] = useState(false)

  const isValidToPost =
    recruitType !== null && title.length > 0 && tags.length > 0 && content.length > 0

  const makePositionMap = () => {
    const positionMap: Record<number, UserPositionInfo[]> = {}
    positions.forEach((position, index) => {
      positionMap[index] = position
    })
    return positionMap
  }

  const makeTagMap = () => {
    return {
      place:
        tags.find((tag) => tag.section === '사냥터' || tag.section === '파티퀘스트')?.name ?? null,
      role: (tags.find((tag) => tag.section === '역할')?.name as RoleType | undefined) ?? null,
      method:
        (tags.find((tag) => tag.section === '운용방식')?.name as MethodType | undefined) ?? null,
    }
  }

  const onPost = async () => {
    if (!session) return
    if (!isValidToPost) return
    setIsPosting(true)
    await setPartyData({
      ...placeholder,
      title,
      content,
      recruitType,
      tags: makeTagMap(),
      positions: makePositionMap(),
      updatedAt: new Date(),
    })
    router.push(`/party/${placeholder.id}`)
    setIsPosting(false)
  }

  return (
    <>
      <div className="mb-5">
        <RecruitSelector
          placeholder={placeholder.recruitType}
          onChange={(recruitValue) => setRecruitType(recruitValue)}
        />
      </div>
      <div className="mb-5">
        <TitleInput
          placeholder={placeholder.title}
          onChange={(titleValue) => setTitle(titleValue)}
        />
      </div>
      <div className="mb-5">
        <TagSelector
          placeholder={placeholder.tags}
          onChange={(tagValues) => setTags(tagValues)}
          ignores={['구인구직']}
        />
      </div>
      <div className="mb-12">
        <ContentInput
          placeholder={placeholder.content}
          onChange={(contentValue) => setContent(contentValue)}
        />
      </div>
      <div className="mb-12">
        <div className="text-2xl font-medium mb-3">맵 지형</div>
        <PositionSelector
          placeholder={placeholder.positions}
          onChange={(positionValues) => setPositions(positionValues)}
        />
      </div>
      <div className="pt-3 flex-center">
        <button
          type="button"
          disabled={!isValidToPost || isPosting}
          onClick={onPost}
          className={`px-12 py-4 rounded-md font-semibold bg-accent-blue ${!isValidToPost || isPosting ? 'opacity-50' : ''}`}
        >
          수정하기
        </button>
      </div>
    </>
  )
}

export default EditForm
