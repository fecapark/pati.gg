import { Suspense } from 'react'

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import authOptions from '@/app/api/auth/[...nextauth]/options'
import useDiscordSession from '@/hooks/useDiscordSession'
import { getUserData } from '@/server/user/user'

import ProfileInfo from './_components/ProfileInfo'
import ProfileInfoSkeleton from './_components/skeletons/ProfileInfoSkeleton'

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
      userData === null ? '유저를 찾을 수 없습니다.' : `${userData.name} 프로필 - 파티지지 pati.gg`,
    description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
  }
}

const ProfilePage = async () => {
  const session = await useDiscordSession()

  return (
    <div className="w-full min-h-[100vh] flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col items-start mb-4 pt-[80px]">
        <Suspense fallback={<ProfileInfoSkeleton />}>
          <ProfileInfo session={session} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProfilePage