'use client'

import { usePathname } from 'next/navigation'

const useEditPostId = () => {
  const pathname = usePathname()
  const id = pathname.split('/').at(-1) ?? ''

  return id
}

export default useEditPostId
