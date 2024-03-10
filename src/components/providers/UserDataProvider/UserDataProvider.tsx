import useDiscordSession from '@/hooks/useDiscordSession'

import UserDataSetter from './UserDataSetter'

const UserDataProvider = async () => {
  const session = await useDiscordSession()
  return <UserDataSetter session={session} />
}

export default UserDataProvider
