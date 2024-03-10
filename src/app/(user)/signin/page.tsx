import { Metadata } from 'next'
import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'

import SignInTitle from '@/app/(user)/signin/_components/SignInTitle'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import SignIn from '@/components/utils/auth/SignIn'
import useDiscordSession from '@/hooks/useDiscordSession'

export const metadata: Metadata = {
  title: '로그인 - 파티지지 pati.gg',
  description: '파티지지에 로그인해서 모든 기능을 사용해보세요.',
}

const SignInPage = async () => {
  const session = await useDiscordSession()

  return (
    <div className="flex-center w-full h-[80vh]">
      <div className="flex-center flex-col">
        {session ? (
          <>
            <div className="text-8xl mb-8">🤔</div>
            <SignInTitle>파티지지에 이미 로그인되어 있으세요!</SignInTitle>
            <div className="w-full flex-center flex-col text-[#e0e0e0] mb-10 leading-[1.6]">
              <span>{session.user.name}님 맞으시죠?</span>
              <span>다시 돌려보내 드릴게요!</span>
            </div>
            <Link href="/">
              <div className="card-border card-bg w-[240px] py-3 flex-center">돌아갈게요</div>
            </Link>
          </>
        ) : (
          <>
            <SignInTitle>
              파티지지에 로그인해서
              <br />
              모든 기능을 사용해보세요.
            </SignInTitle>
            <div className="w-full flex-center flex-col text-[#e0e0e0] mb-10 leading-[1.6]">
              <span>파티 관련 글을 작성할 수 있어요.</span>
              <span>파티를 구하면서 봉변을 당하셨나요? 해당 유저를 신고하실 수도 있고요.</span>
              <span>그리고... 앞으로 추가될 다양한 기능들을 사용할 수 있겠죠?</span>
            </div>
            <div className="w-[240px]">
              <SignIn>
                <div className="flex-center gap-2 rounded-md bg-discord-primary p-3">
                  <IconWrapper className="text-2xl">
                    <FaDiscord />
                  </IconWrapper>
                  <span className="font-medium">어서오세요!</span>
                </div>
              </SignIn>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default SignInPage
