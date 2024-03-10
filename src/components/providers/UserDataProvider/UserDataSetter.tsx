'use client'

import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { useSetRecoilState } from 'recoil'

import { getUserData } from '@/server/user/user'
import { userDataAtom } from '@/shared/atom'

interface UserDataSetterProps {
  session: Session | null
}

const UserDataSetter = ({ session }: UserDataSetterProps) => {
  const setUserData = useSetRecoilState(userDataAtom)

  const { data } = useQuery({
    queryKey: ['db-user-data', session?.user.id],
    queryFn: async () => {
      if (!session) return null
      return getUserData(session.user.id)
    },
    placeholderData: undefined,
  })

  useEffect(() => {
    setUserData(data)
  }, [data, setUserData])

  return null
}

export default UserDataSetter
