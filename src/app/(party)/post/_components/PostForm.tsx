'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { MdInfo } from 'react-icons/md'
import { useSetRecoilState } from 'recoil'

import InvalidWordPosting from '@/components/layouts/Modal/contents/InvalidWordPosting'
import TagSelector from '@/components/shared/TagSelector/TagSelector'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import useModal from '@/hooks/useModal'
import { setPartyData } from '@/server/party/party'
import { setUserPostedNow } from '@/server/user/user'
import { userDataAtom } from '@/shared/atom'
import { UserPositionInfo } from '@/types/post'
import { BaseTagData, MethodType, RoleType } from '@/types/tag'

import useInvalidWordChecker from '../_hooks/useInvalidWordChecker'

import ContentInput from './ContentInput'
import PositionSelector from './PositionSelector'
import RecruitSelector from './RecruitSelector'
import TitleInput from './TitleInput'

interface PostFormProps {
  session: Session | null
}

const PostForm = ({ session }: PostFormProps) => {
  const router = useRouter()
  const setUserData = useSetRecoilState(userDataAtom)
  const [recruitType, setRecruitType] = useState<'구인' | '구직' | null>(null)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<BaseTagData[]>([])
  const [content, setContent] = useState('')
  const [positions, setPositions] = useState<UserPositionInfo[][]>([])
  const [isPosting, setIsPosting] = useState(false)
  const hasInvalidWord = useInvalidWordChecker([title, content])
  const setInvalidWordPosting = useModal({
    title: '부적절한 단어가 포함되어 있어요',
    content: <InvalidWordPosting />,
  })

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
    if (hasInvalidWord()) {
      setInvalidWordPosting(true)
      return
    }

    const id = crypto.randomUUID()
    setIsPosting(true)
    await setPartyData({
      title,
      content,
      tags: makeTagMap(),
      id,
      recruitType,
      author: session.user.id,
      authorName: session.user.name || '',
      avatar: session.user.image || null,
      createdAt: new Date(),
      updatedAt: null,
      inProgress: true,
      positions: makePositionMap(),
    })
    setUserData((prev) => {
      if (!prev) return prev
      return { ...prev, postedAt: new Date() }
    })
    router.push(`/party/${id}`)
    setIsPosting(false)
    await setUserPostedNow(session.user.id)
  }

  return (
    <>
      <div className="mb-5">
        <RecruitSelector onChange={(recruitValue) => setRecruitType(recruitValue)} />
      </div>
      <div className="mb-5">
        <TitleInput onChange={(titleValue) => setTitle(titleValue)} />
      </div>
      <div className="mb-5">
        <TagSelector onChange={(tagValues) => setTags(tagValues)} ignores={['구인구직']} />
      </div>
      <div className="mb-12">
        <ContentInput onChange={(contentValue) => setContent(contentValue)} />
      </div>
      <div className="mb-20">
        <div className="text-2xl font-medium mb-3">맵 지형</div>
        <PositionSelector onChange={(positionValues) => setPositions(positionValues)} />
      </div>
      <div className="flex-center text-[#a0a0a0] mb-12">
        <IconWrapper className="mr-3 text-xl">
          <MdInfo />
        </IconWrapper>
        <span className="text-sm">
          글 작성 이후 삭제하실 수 없으며, <br />
          <b>잠쩔</b> 관련 게시물 작성시 서비스 이용이 제한될 수 있습니다.
        </span>
      </div>
      <div className="flex-center">
        <button
          type="button"
          disabled={!isValidToPost || isPosting}
          onClick={onPost}
          className={`px-12 py-4 rounded-md font-semibold bg-accent-blue ${!isValidToPost || isPosting ? 'opacity-50' : ''}`}
        >
          남기기
        </button>
      </div>
    </>
  )
}

export default PostForm
