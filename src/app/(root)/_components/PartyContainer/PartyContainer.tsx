import PostBar from '@/components/shared/PostBar/PostBar'

import TagCloud from '../TagCloud'

import RecentPartyContainer from './RecentPartyContainer'
import RolePartyContainer from './RolePartyContainer'

const PartyContainer = () => {
  return (
    <div>
      <TagCloud />
      <RecentPartyContainer />
      <RolePartyContainer />
      <PostBar />
    </div>
  )
}

export default PartyContainer
