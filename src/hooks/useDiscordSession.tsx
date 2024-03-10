import { getServerSession } from 'next-auth'

import authOptions from '@/app/api/auth/[...nextauth]/options'

const useDiscordSession = async () => {
  return getServerSession(authOptions)
}

export default useDiscordSession
