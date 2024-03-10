'use client'

import { signOut } from 'next-auth/react'

interface SignOutProps {
  onClick?: () => void
  children: React.ReactNode
}

const SignOut = ({ onClick = () => {}, children }: SignOutProps) => {
  const onSignOut = () => {
    onClick()
    signOut()
  }

  return (
    <button className="block w-full" type="button" onClick={onSignOut}>
      {children}
    </button>
  )
}

export default SignOut
