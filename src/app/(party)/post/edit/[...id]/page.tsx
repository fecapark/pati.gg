import { Metadata } from 'next'

import useDiscordSession from '@/hooks/useDiscordSession'

import EditFormPlaceholder from './_components/EditFormPlaceholder'

export const metadata: Metadata = {
  title: '파티 글 수정 - 파티지지 pati.gg',
  description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
}

const PostEditPage = async () => {
  const session = await useDiscordSession()

  return (
    <div className="w-full flex-center">
      <div className="w-full max-w-[600px]">
        <div className="pt-[40px] mb-12">
          <h1 className="text-3xl font-medium">파티 글 수정</h1>
        </div>
        <EditFormPlaceholder session={session} />
      </div>
    </div>
  )
}

export default PostEditPage
