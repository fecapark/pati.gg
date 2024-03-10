'use client'

import { Session } from 'next-auth'
import { useRecoilState } from 'recoil'

import { isSidebarActiveAtom } from '@/shared/atom'

import SideBarItem from './SideBarContent'
import SideBarHeader from './SideBarHeader'

interface ProfileSideBarProps {
  session: Session | null
}

const ProfileSideBar = ({ session }: ProfileSideBarProps) => {
  const [isSideBarActive, setIsSideBarActive] = useRecoilState(isSidebarActiveAtom)

  const onBackgroundClick = () => {
    setIsSideBarActive(false)
  }

  if (!session) {
    return null
  }

  return (
    <div
      className="fixed z-50 w-full h-[100vh] top-0 right-0 flex flex-col"
      style={{
        visibility: isSideBarActive ? 'visible' : 'hidden',
      }}
    >
      <div className="w-full h-full bg-white opacity-10" onClick={onBackgroundClick} />
      <div
        className="absolute top-0 right-0 w-[320px] h-full card-bg rounded-l-xl"
        style={{
          transform: isSideBarActive ? 'translateX(0)' : 'translateX(100%)',
          transition: isSideBarActive ? 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)' : 'none',
        }}
      >
        <div className="py-4">
          <SideBarHeader session={session} />
          <SideBarItem session={session} />
        </div>
      </div>
    </div>
  )
}

export default ProfileSideBar
