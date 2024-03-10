import { HiSpeakerphone } from 'react-icons/hi'

import PartyContainer from '@/app/(root)/_components/PartyContainer/PartyContainer'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'

const NoticeContainer = ({ hidden }: { hidden: boolean }) => {
  if (hidden) return null

  return (
    <div className="flex-center py-3">
      <div className="w-full flex-center">
        <div className="card-border card-bg w-fit pr-4 pl-4 py-2">
          <div className="flex items-center">
            <IconWrapper className="text-[#B31306] mr-2 text-lg">
              <HiSpeakerphone />
            </IconWrapper>
            <div>
              <div className="w-full text-[#d2d2d5] text-sm">
                [공지] 모바일 대응은 추후 제공될 예정입니다. 원활한 서비스 사용을 위해 PC에서
                이용해주세요.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Home = async () => {
  return (
    <div className="w-full">
      <div className="max-w-[1000px] w-full mx-auto">
        <NoticeContainer hidden={false} />
        <PartyContainer />
      </div>
    </div>
  )
}

export default Home
