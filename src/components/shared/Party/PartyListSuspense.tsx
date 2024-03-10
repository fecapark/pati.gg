import { Suspense } from 'react'

import Link from 'next/link'

import PartySkeleton from './PartySkeleton'

interface PartyListSuspenseProps {
  title: React.ReactNode
  moreHref?: string
  wrapperClassName?: string
  children: React.ReactNode
  maxChildrenCount: number
}

const SkeletonLoader = ({ count }: { count: number }) => {
  return Array.from({ length: count }).map((_, i) => <PartySkeleton key={i} />)
}

const PartyListSuspense = ({
  title,
  moreHref = '',
  maxChildrenCount,
  wrapperClassName = '',
  children,
}: PartyListSuspenseProps) => {
  return (
    <div>
      <div className="mb-6">
        <span className="text-3xl font-semibold">{title}</span>
      </div>
      <div className={wrapperClassName}>
        <Suspense fallback={<SkeletonLoader count={maxChildrenCount} />}>{children}</Suspense>
      </div>
      {moreHref !== '' && (
        <Link href={moreHref}>
          <div
            className="w-full flex-center card-bg card-border py-3 mt-4 text-sm text-[#c3c3c6] cursor-pointer hover:card-hover"
            style={{
              transition: '0.15s cubic-bezier(0.2, 0, 0, 1)',
            }}
          >
            더보기
          </div>
        </Link>
      )}
    </div>
  )
}

export default PartyListSuspense
