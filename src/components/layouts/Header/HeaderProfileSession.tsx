import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'

import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import useDiscordSession from '@/hooks/useDiscordSession'

import ProfileThumb from './ProfileThumb'

const HeaderProfileSession = async () => {
  const session = await useDiscordSession()

  if (session) {
    return <ProfileThumb session={session} />
  }

  return (
    <Link href="/signin">
      <div className="flex-center gap-2 px-6 py-2 rounded-lg bg-discord-primary">
        <IconWrapper className="text-lg">
          <FaDiscord />
        </IconWrapper>
        <span className="font-medium text-sm">로그인</span>
      </div>
    </Link>
  )
}

export default HeaderProfileSession
