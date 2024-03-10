'use client'

import { useSetRecoilState } from 'recoil'

import { isModalActiveAtom, modalContentAtom } from '@/shared/atom'
import { IModalContent } from '@/types/modal'

export default function useModal(content: IModalContent) {
  const setIsModalActive = useSetRecoilState(isModalActiveAtom)
  const setModalContent = useSetRecoilState(modalContentAtom)

  const setThisModal = (state: boolean) => {
    setIsModalActive(state)
    setModalContent(content)
  }

  return setThisModal
}
