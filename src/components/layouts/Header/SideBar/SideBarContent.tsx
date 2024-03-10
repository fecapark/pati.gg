import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { MdLogout, MdPerson } from 'react-icons/md'
import { useSetRecoilState } from 'recoil'

import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import { isSidebarActiveAtom } from '@/shared/atom'

interface SideBarContentProps {
  session: Session
}

interface ContentListItemProps {
  icon: React.ReactNode
  text: string
  linkTo?: string
  onClick?: () => void
}

const ContentListItem = ({ icon, text, linkTo, onClick = () => {} }: ContentListItemProps) => {
  const content = (
    <div
      className="py-[10px] px-7 hover:bg-[#323236] cursor-pointer flex items-center gap-2"
      onClick={onClick}
    >
      <div className="flex items-center w-full gap-2">
        <IconWrapper className="text-lg text-[#a0a0a0]">{icon}</IconWrapper>
        <span className="text-sm font-medium">{text}</span>
      </div>
    </div>
  )

  if (linkTo) {
    return <Link href={linkTo}>{content}</Link>
  }

  return content
}

const SideBarContent = ({ session }: SideBarContentProps) => {
  const setIsSideBarActive = useSetRecoilState(isSidebarActiveAtom)

  return (
    <div className="py-4">
      <ContentListItem
        icon={<MdPerson />}
        text="마이페이지"
        linkTo={`/profile/${session.user.id}`}
        onClick={() => setIsSideBarActive(false)}
      />
      <ContentListItem
        icon={<MdLogout />}
        text="로그아웃"
        onClick={() => {
          signOut()
          setIsSideBarActive(false)
        }}
      />
    </div>
  )
}

export default SideBarContent
