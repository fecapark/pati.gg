'use client'

import { usePathname } from 'next/navigation'

const useProfileId = () => {
  const pathname = usePathname()
  const id = pathname.split('/').at(2) ?? ''

  return id
}

export default useProfileId
