'use client'

import { useEffect } from 'react'

import { notFound, useRouter } from 'next/navigation'
import { Session } from 'next-auth'

import usePostSessionAuth from '@/hooks/usePostSessionAuth'
import { DBPartyData } from '@/types/party'

interface EditAuthProps {
  session: Session | null
  data: DBPartyData | null | undefined
  isLoading: boolean
  children: React.ReactNode
}

const EditAuth = ({ session, data, isLoading, children }: EditAuthProps) => {
  const router = useRouter()
  const authState = usePostSessionAuth(session)

  useEffect(() => {
    if (isLoading) return
    if (authState === 'loading') return

    if (!session || authState === 'no-session') {
      router.push('/signin')
      return
    }

    if (authState === 'no-user-data') {
      router.push(`/profile/${session.user.id}`)
    }
  }, [isLoading, authState, session, router])

  // 로딩중
  if (data === undefined) return null

  // 없는 파티 데이터 (유저가 임의로 접근)
  if (data === null) {
    notFound()
  }

  // 로그인 하지 않았다면 (어차피 effect에서 리다이렉트 처리함)
  if (!session) return null

  if (data.author !== session.user.id) {
    return <span>해당 글 수정에 접근할 권한이 없습니다.</span>
  }

  return children
}

export default EditAuth
