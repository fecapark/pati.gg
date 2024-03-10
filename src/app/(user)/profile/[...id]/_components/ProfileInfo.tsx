'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { FaDiscord } from 'react-icons/fa'
import { IoMdGlobe } from 'react-icons/io'
import { MdPerson } from 'react-icons/md'

import AutoHeightImage from '@/components/utils/AutoHeightImage/AutoHeightImage'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import NewWindowLink from '@/components/utils/NewWindowLink/NewWindowLink'
import { getUserData } from '@/server/user/user'
import { parseAvatarSource } from '@/utils/avatar'

import useProfileId from '../_hooks/useProfileId'

import NotFulfilledProfile from './NotFulfilledProfile'
import ProfileHeader from './ProfileHeader'
import UserWrittenParties from './UserWrittenParties'

interface ProfileInfoProps {
  session: Session | null
}

const ProfileInfo = ({ session }: ProfileInfoProps) => {
  const profileId = useProfileId()

  const { data: profileData } = useSuspenseQuery({
    queryKey: ['profile-user-data', profileId],
    queryFn: async () => getUserData(profileId),
  })

  if (profileData === null) {
    return <NotFulfilledProfile session={session} />
  }

  return (
    <>
      <div className="w-full">
        <ProfileHeader session={session} />
        <div>
          <div className="flex items-center mb-16">
            <div className="w-[48px] rounded-[50%] overflow-hidden mr-4">
              <AutoHeightImage src={parseAvatarSource(profileData.avatar)} alt="" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-semibold text-xl">{profileData.name}</span>
                <NewWindowLink href={`https://discord.com/users/${profileData.id}`}>
                  <IconWrapper className="text-xl ml-2 p-2 text-[#c2c2c5] cursor-pointer hover:bg-[#ffffff22] rounded-[50%]">
                    <FaDiscord />
                  </IconWrapper>
                </NewWindowLink>
              </div>
              <span className="text-[#b2b2b5]">{profileData.email}</span>
            </div>
          </div>
          <div className="flex gap-6 mb-16">
            <div className="w-[320px] card-border card-bg px-5 py-3">
              <div className="mb-3 flex items-center text-[#c3c3c6]">
                <IconWrapper className="text-xl mr-2">
                  <MdPerson />
                </IconWrapper>
                <span className="font-medium text-sm">캐릭터</span>
              </div>
              <div className="flex flex-col">
                <div className="mb-1">
                  <span className="font-semibold text-xl">{profileData.maplelandName}</span>
                </div>
                <div className="flex text-sm font-semibold text-[#e0e0e0]">
                  <span className="mr-2">Lv. {profileData.level}</span>
                  <span>{profileData.job}</span>
                </div>
              </div>
            </div>
            <div className="w-[320px] card-border card-bg px-5 py-3">
              <div className="mb-3 flex items-center text-[#c3c3c6]">
                <IconWrapper className="text-xl mr-2">
                  <IoMdGlobe />
                </IconWrapper>
                <span className="font-medium text-sm">메이플스토리 월드</span>
              </div>
              <div className="flex flex-col">
                <div className="mb-1">
                  <span className="mr-2 font-semibold text-xl">{profileData.mapleworldName}</span>

                  <span className="text-[15px] font-semibold text-[#b2b2b5]">
                    #{profileData.mapleworldTag}
                  </span>
                </div>
                <div className="flex">
                  <NewWindowLink
                    href={`https://maplestoryworlds.nexon.com/ko/profile/${profileData.mapleworldTag}`}
                  >
                    <span className="text-sm font-bold">월드 프로필 보기</span>
                  </NewWindowLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserWrittenParties />
    </>
  )
}

export default ProfileInfo
