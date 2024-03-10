'use client'

import { signIn } from 'next-auth/react'

interface SignInProps {
  onClick?: () => void
  children: React.ReactNode
}

const SignIn = ({ onClick = () => {}, children }: SignInProps) => {
  const onSignIn = () => {
    onClick()
    signIn('discord')
  }

  return (
    <button className="block w-full" type="button" onClick={onSignIn}>
      {children}
    </button>
  )
}

export default SignIn
