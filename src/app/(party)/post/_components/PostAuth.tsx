'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

import FastPosting from '@/components/layouts/Modal/contents/FastPosting'
import usePostSessionAuth from '@/hooks/usePostSessionAuth'

interface PostAuthProps {
  session: Session | null
  children: React.ReactNode
}

const PostAuth = ({ session, children }: PostAuthProps) => {
  const router = useRouter()
  const authState = usePostSessionAuth(session)

  useEffect(() => {
    if (authState === 'loading') return

    if (!session || authState === 'no-session') {
      router.push('/signin')
      return
    }

    if (authState === 'no-user-data') {
      router.push(`/profile/${session.user.id}`)
    }
  }, [authState, session, router])

  if (authState === 'fast-posting') {
    return <FastPosting />
  }

  if (authState !== 'authed') {
    return null
  }

  return children
}

export default PostAuth
