'use client'

import { Session } from 'next-auth'
import { MdWarning } from 'react-icons/md'
import { useRecoilValue } from 'recoil'

import AutoHeightImage from '@/components/utils/AutoHeightImage/AutoHeightImage'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import { userDataAtom } from '@/shared/atom'
import { DBUserData } from '@/types/user'
import { parseAvatarSource } from '@/utils/avatar'

interface SideBarHeaderProps {
  session: Session
}

const ProfileWarning = ({ userData }: { userData: DBUserData | null | undefined }) => {
  if (userData || userData === undefined) return null

  return (
    <div className="text-sm text-accent-red flex items-center mt-4">
      <IconWrapper className="text-[15px] mr-1">
        <MdWarning />
      </IconWrapper>
      <span>하단의 프로필에서 정보를 완성해주세요.</span>
    </div>
  )
}

const SideBarHeader = ({ session }: SideBarHeaderProps) => {
  const { image, name, email } = session.user
  const userData = useRecoilValue(userDataAtom)

  return (
    <div className="px-4">
      <div className="flex items-center">
        <div className="w-[40px] overflow-hidden rounded-[50%] mr-3">
          <AutoHeightImage src={parseAvatarSource(image)} alt="avatar" />
        </div>
        <div className="flex flex-col leading-[1]">
          <span className="font-bold text-sm">{name}</span>
          <span className="text-sm text-[#a0a0a0]">{email}</span>
        </div>
      </div>
      <ProfileWarning userData={userData} />
    </div>
  )
}

export default SideBarHeader
