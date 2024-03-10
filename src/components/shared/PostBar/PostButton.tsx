'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { MdEdit } from 'react-icons/md'
import { Oval } from 'react-loader-spinner'
import { useRecoilValue } from 'recoil'

import FastPosting from '@/components/layouts/Modal/contents/FastPosting'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import useModal from '@/hooks/useModal'
import { userDataAtom } from '@/shared/atom'

interface PostButtonProps {
  session: Session | null
}

const PostButton = ({ session }: PostButtonProps) => {
  const router = useRouter()
  const userData = useRecoilValue(userDataAtom)
  const [isHover, setIsHover] = useState(false)
  const setFastPostingModal = useModal({
    title: '지금 모집글을 작성할 수 없어요',
    content: <FastPosting />,
  })

  const onHover = () => {
    setIsHover(true)
  }

  const onOut = () => {
    setIsHover(false)
  }

  const onClick = () => {
    if (!session) {
      router.push('/signin')
      return
    }

    if (userData === null) {
      router.push(`/profile/${session.user.id}`)
      return
    }

    if (userData === undefined) return

    const elapsed = +new Date() - +userData.postedAt
    if (elapsed < 1000 * 60 * 30) {
      setFastPostingModal(true)
      return
    }

    router.push('/post')
  }

  return (
    <button
      type="button"
      aria-label="new-post"
      className="flex-center p-[16px] bg-accent-blue rounded-[1000px]"
      onPointerEnter={onHover}
      onPointerLeave={onOut}
      onClick={onClick}
    >
      {userData === undefined ? (
        <div>
          <Oval width={24} height={24} color="white" strokeWidth={4} secondaryColor="#ffffff00" />
        </div>
      ) : (
        <>
          <IconWrapper className="text-2xl">
            <MdEdit />
          </IconWrapper>
          <div
            className="break-keep whitespace-nowrap overflow-hidden"
            style={{
              width: isHover ? '180px' : '0',
              transition: 'width 0.3s cubic-bezier(0.2, 0, 0, 1)',
            }}
          >
            <span className="text-sm">빠르게 파티를 모집해보세요!</span>
          </div>
        </>
      )}
    </button>
  )
}

export default PostButton
