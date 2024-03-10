import { Metadata } from 'next'

import PostForm from '@/app/(party)/post/_components/PostForm'
import useDiscordSession from '@/hooks/useDiscordSession'

import PostAuth from './_components/PostAuth'

export const metadata: Metadata = {
  title: '파티 글 작성 - 파티지지 pati.gg',
  description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
}

const PostPage = async () => {
  const session = await useDiscordSession()

  return (
    <div className="w-full flex-center">
      <div className="w-full max-w-[600px]">
        <div className="pt-[40px] mb-12">
          <h1 className="text-3xl font-medium">파티 글 작성</h1>
        </div>
        <PostAuth session={session}>
          <PostForm session={session} />
        </PostAuth>
      </div>
    </div>
  )
}

export default PostPage
