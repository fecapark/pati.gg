'use client'

import { useEffect, useState } from 'react'

import { useRecoilValue } from 'recoil'

import { userDataAtom } from '@/shared/atom'

const FastPosting = () => {
  const [now, setNow] = useState(new Date())
  const userData = useRecoilValue(userDataAtom)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!userData) return null

  const leftTime = Math.floor((userData.postedAt.getTime() + 1000 * 60 * 30 - now.getTime()) / 1000)

  return (
    <div>
      <p>파티 모집글은 30분에 한 번씩만 작성할 수 있어요.</p>
      <br />
      <p>
        {leftTime > 0
          ? `다음 글을 작성할 수 있는 시간까지 ${Math.floor(leftTime / 60)}분 ${leftTime % 60}초 남았어요.`
          : '지금 글을 작성할 수 있어요!'}
      </p>
    </div>
  )
}

export default FastPosting
