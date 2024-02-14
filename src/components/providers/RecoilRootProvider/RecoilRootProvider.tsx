'use client'

import { RecoilRoot } from 'recoil'

interface RecoilRootProviderProps {
  children: React.ReactNode
}

const RecoilRootProvider = ({ children }: RecoilRootProviderProps) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default RecoilRootProvider
