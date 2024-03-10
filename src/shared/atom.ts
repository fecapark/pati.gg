import { atom } from 'recoil'

import { IModalContent } from '@/types/modal'
import { DBUserData } from '@/types/user'

export const isSidebarActiveAtom = atom<boolean>({
  key: 'isSidebarActiveAtom',
  default: false,
})

export const isFunnelCanGoNextAtom = atom<boolean>({
  key: 'isFunnelCanGoNext',
  default: false,
})

export const userDataAtom = atom<DBUserData | null | undefined>({
  key: 'userDataAtom',
  default: undefined,
})

export const isSearchActiveAtom = atom<boolean>({
  key: 'isSearchActiveAtom',
  default: false,
})

export const isModalActiveAtom = atom<boolean>({
  key: 'isModalActive',
  default: false,
})

export const modalContentAtom = atom<IModalContent | null>({
  key: 'modalContent',
  default: null,
})
