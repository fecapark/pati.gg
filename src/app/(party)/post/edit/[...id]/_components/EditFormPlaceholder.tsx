'use client'

import { useQuery } from '@tanstack/react-query'
import { Session } from 'next-auth'

import { getPartyDataById } from '@/server/party/party'

import useEditPostId from '../_hooks/useEditPostId'

import EditAuth from './EditAuth'
import EditForm from './EditForm'

interface EditFormPlaceholderProps {
  session: Session | null
}

const EditFormPlaceholder = ({ session }: EditFormPlaceholderProps) => {
  const postId = useEditPostId()

  const { data, isLoading } = useQuery({
    queryKey: ['edit-post-auth', postId],
    queryFn: () => getPartyDataById(postId),
    initialData: undefined,
  })

  return (
    <EditAuth session={session} data={data} isLoading={isLoading}>
      <EditForm placeholder={data!} session={session} />
    </EditAuth>
  )
}

export default EditFormPlaceholder
