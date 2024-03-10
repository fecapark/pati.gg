'use client'

import Link from 'next/link'
import { Session } from 'next-auth'
import { MdEdit } from 'react-icons/md'

import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'

import useIsProfileOwner from '../_hooks/useIsProfileOwner'

interface ProfileHeaderProps {
  session: Session | null
}

const ProfileHeader = ({ session }: ProfileHeaderProps) => {
  const isProfileOwner = useIsProfileOwner(session)

  if (!isProfileOwner) return null

  return (
    <div className="mb-12 flex justify-between items-center">
      <span className="text-4xl font-semibold py-2">마이페이지</span>
      <Link href={`/edit/${session!.user.id}`}>
        <IconWrapper className="p-3 rounded-[50%] hover:bg-[#38383a] text-lg">
          <MdEdit />
        </IconWrapper>
      </Link>
    </div>
  )
}

export default ProfileHeader
