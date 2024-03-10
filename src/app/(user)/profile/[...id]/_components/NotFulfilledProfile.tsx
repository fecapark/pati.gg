'use client'

import Link from 'next/link'
import { Session } from 'next-auth'

import useIsProfileOwner from '../_hooks/useIsProfileOwner'

const NotFulfilledProfile = ({ session }: { session: Session | null }) => {
  const isProfileOwner = useIsProfileOwner(session)

  if (isProfileOwner) {
    return (
      <div className="w-full min-h-[80vh] flex-center">
        <div className="flex-center flex-col">
          <span className="font-semibold text-3xl mb-2">프로필을 완성해주세요</span>
          <span className="font-semibold text-[#c2c2c6] mb-8">
            프로필을 완성하시면, 모든 기능을 이용하실 수 있게 돼요.
          </span>
          <Link href={`/edit/${session!.user.id}`}>
            <div className="px-8 py-3 bg-accent-blue rounded-md font-medium">
              빠르게 프로필 완성하기
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[80vh] flex-center">
      <div className="flex-center flex-col">
        <span className="font-semibold text-3xl mb-2">해당 유저의 프로필을 볼 수 없어요</span>
        <span className="font-semibold text-[#c2c2c6] mb-8">
          프로필을 완성하지 않은 유저 같아요.
        </span>
        <Link href="/">
          <div className="px-8 py-3 bg-accent-blue rounded-md font-medium">돌아가기</div>
        </Link>
      </div>
    </div>
  )
}

export default NotFulfilledProfile
