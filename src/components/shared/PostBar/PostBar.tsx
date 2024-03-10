import { getServerSession } from 'next-auth'

import authOptions from '@/app/api/auth/[...nextauth]/options'

import PostButton from './PostButton'

const PostBar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="sticky bottom-5">
      <div className="absolute -right-[72px] bottom-0">
        <PostButton session={session} />
      </div>
    </div>
  )
}

export default PostBar
