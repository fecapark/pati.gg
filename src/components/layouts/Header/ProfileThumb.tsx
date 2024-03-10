'use client'

import { useEffect } from 'react'

import { Session } from 'next-auth'
import { useSetRecoilState } from 'recoil'

import ProfileSideBar from '@/components/layouts/Header/SideBar/SideBar'
import AutoHeightImage from '@/components/utils/AutoHeightImage/AutoHeightImage'
import { isSidebarActiveAtom } from '@/shared/atom'
import { parseAvatarSource } from '@/utils/avatar'

interface ProfileThumbProps {
  session: Session
}

const ProfileThumb = ({ session }: ProfileThumbProps) => {
  const setIsSideBarActive = useSetRecoilState(isSidebarActiveAtom)
  const imageSource = parseAvatarSource(session.user.image)

  const onClick = () => {
    setIsSideBarActive(true)
  }

  useEffect(() => {
    return () => {
      setIsSideBarActive(false)
    }
  }, [setIsSideBarActive])

  return (
    <>
      <ProfileSideBar session={session} />
      <button
        type="button"
        className="w-[40px] rounded-[50%] overflow-hidden bg-[#323235] cursor-pointer"
        onClick={onClick}
      >
        <AutoHeightImage alt="avatar" src={imageSource} />
      </button>
    </>
  )
}

export default ProfileThumb
