import { useState } from 'react'

import axios from 'axios'

import { TagResponseData } from '@/types/tag'

const useTagAuth = () => {
  const [data, setData] = useState<TagResponseData>({
    name: '',
    tag: '',
    avatar: null,
    playedMapleland: false,
    success: null,
  })
  const [isAuthed, setIsAuthed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const requestTagAuth = async (tag: string) => {
    try {
      setIsLoading(true)
      const { data: res, statusText } = await axios<TagResponseData>(`/api/tagauth?tag=${tag}`)
      console.log(statusText)
      setIsAuthed(!!res.success)
      setData(res)
    } catch (error) {
      setIsAuthed(false)
    }

    setIsLoading(false)
  }

  const auth = (tag: string) => {
    requestTagAuth(tag.replace('#', ''))
  }

  return { data, isAuthed, isLoading, auth }
}

export default useTagAuth
