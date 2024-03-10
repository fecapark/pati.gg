'use client'

import { redirect, usePathname } from 'next/navigation'
import { Session } from 'next-auth'

interface AuthDetectorProps {
  session: Session | null
}

const AuthDetector = ({ session }: AuthDetectorProps) => {
  const pathname = usePathname()
  const queryId = pathname.split('/').at(2)

  if (!session) {
    redirect('/signin')
  }

  if (!queryId || queryId !== session.user.id) {
    redirect('/')
  }

  return null
}
export default AuthDetector
