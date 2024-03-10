import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import AuthDetector from '@/app/(user)/edit/[...id]/_components/AuthDetector'
import ProfileFunnel from '@/app/(user)/edit/[...id]/_components/ProfileFunnel'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import useDiscordSession from '@/hooks/useDiscordSession'
import { getUserData } from '@/server/user/user'

interface PageProps {
  params: { id: string[] }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      title: '로그인이 필요합니다. - 파티지지 pati.gg',
      description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
    }
  }

  const userData = await getUserData(id[0])

  return {
    title:
      userData === null
        ? '유저를 찾을 수 없습니다.'
        : `${userData.name} 정보 수정 - 파티지지 pati.gg`,
    description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
  }
}

const ProfileEditPage = async () => {
  const session = await useDiscordSession()

  return (
    <>
      <AuthDetector session={session} />
      <div className="w-full h-[80vh] flex-center">
        <ProfileFunnel session={session} />
      </div>
    </>
  )
}

export default ProfileEditPage
