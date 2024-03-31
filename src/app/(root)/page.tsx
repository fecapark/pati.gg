import { HiSpeakerphone } from 'react-icons/hi'

import PartyContainer from '@/app/(root)/_components/PartyContainer/PartyContainer'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import NewWindowLink from '@/components/utils/NewWindowLink/NewWindowLink'

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
                [공지] 파티글 작성 이벤트 당첨자 발표{' '}
                <NewWindowLink href="https://github.com/fecastudioss/patigg-event-result">
                  [확인하기]
                </NewWindowLink>
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
