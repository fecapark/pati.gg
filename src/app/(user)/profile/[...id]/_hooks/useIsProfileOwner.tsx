import { Session } from 'next-auth'

import useProfileId from './useProfileId'

const useIsProfileOwner = (session: Session | null) => {
  const profileId = useProfileId()

  if (!session) return false
  return session.user.id === profileId
}

export default useIsProfileOwner
