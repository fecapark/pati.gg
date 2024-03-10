'use client'

import { useEffect } from 'react'

import { Session } from 'next-auth'
import { SessionProvider, useSession } from 'next-auth/react'

interface UserAuthValidatorProps {
  onAuthed: (session: Session) => void
  onUnAuthed?: () => void
  onLoading?: () => void
}

interface CheckerProps {
  onAuthed: (session: Session) => void
  onUnAuthed: () => void
  onLoading: () => void
}

const Checker = ({ onAuthed, onUnAuthed, onLoading }: CheckerProps) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') {
      onLoading()
      return
    }

    if (session === undefined) return

    if (status === 'authenticated') {
      onAuthed(session)
      return
    }

    onUnAuthed()
  }, [status, session, onAuthed, onUnAuthed, onLoading])

  return null
}

const UserAuthValidator = ({
  onAuthed,
  onUnAuthed = () => {},
  onLoading = () => {},
}: UserAuthValidatorProps) => {
  return (
    <SessionProvider>
      <Checker onAuthed={onAuthed} onUnAuthed={onUnAuthed} onLoading={onLoading} />
    </SessionProvider>
  )
}

export default UserAuthValidator
