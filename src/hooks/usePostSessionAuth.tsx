'use client'

import { useEffect, useState } from 'react'

import { Session } from 'next-auth'
import { useRecoilValue } from 'recoil'

import { userDataAtom } from '@/shared/atom'

type SessionAuthState = 'loading' | 'no-session' | 'no-user-data' | 'fast-posting' | 'authed'

const usePostSessionAuth = (session: Session | null) => {
  const [authState, setAuthState] = useState<SessionAuthState>('loading')
  const userData = useRecoilValue(userDataAtom)

  useEffect(() => {
    const isFastPosting = () => {
      if (!userData) return false
      const elapsed = +new Date() - +userData.postedAt
      return elapsed < 1000 * 60 * 30
    }

    // 로그인을 하지 않은 경우
    if (!session) {
      setAuthState('no-session')
      return
    }

    // 유저 데이터를 불러오는 중인 경우
    if (userData === undefined) {
      return
    }

    // 유저 데이터가 없는 경우
    if (userData === null) {
      setAuthState('no-user-data')
      return
    }

    // 30분 이내에 글을 작성한 경우
    if (isFastPosting()) {
      setAuthState('fast-posting')
      return
    }

    setAuthState('authed')
  }, [session, userData])

  return authState
}

export default usePostSessionAuth
