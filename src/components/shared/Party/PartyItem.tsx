import Link from 'next/link'

import Tag from '@/components/shared/Tag/Tag'
import AutoHeightImage from '@/components/utils/AutoHeightImage/AutoHeightImage'
import NewWindowLink from '@/components/utils/NewWindowLink/NewWindowLink'
import { DBPartyData } from '@/types/party'
import { parseAvatarSource } from '@/utils/avatar'

const PartyItem = ({ partyData }: { partyData: DBPartyData }) => {
  const getParsedCreatedAt = () => {
    const now = new Date()
    const elapsed = now.getTime() - partyData.createdAt.getTime()
    const elapsedMinutes = Math.floor(elapsed / 1000 / 60)

    if (elapsedMinutes < 1) return '방금 전'
    if (elapsedMinutes < 60) return `${elapsedMinutes}분 전`
    if (elapsedMinutes < 60 * 24) return `${Math.floor(elapsedMinutes / 60)}시간 전`
    if (elapsedMinutes < 60 * 24 * 30) return `${Math.floor(elapsedMinutes / 60 / 24)}일 전`
    return '오래 전'
  }

  return (
    <div
      className={`cursor-pointer w-full card-border card-bg flex flex-col py-4 ${partyData.inProgress ? '' : 'brightness-75'}`}
    >
      <div className="px-6 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <NewWindowLink href={`/profile/${partyData.author}`} noStyle>
            <div className="flex items-center gap-2">
              <div className="w-[24px] rounded-[50%] overflow-hidden">
                <AutoHeightImage src={parseAvatarSource(partyData.avatar)} alt="" />
              </div>
              <div className="font-semibold text-sm">{partyData.authorName}</div>
            </div>
          </NewWindowLink>
          <div className="w-[2px] h-[2px] rounded-[5px] bg-[#c2c2c5]" />
          <div className="text-xs text-[#c2c2c5]">{getParsedCreatedAt()}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="card-border card-bg px-3 py-1 font-medium text-sm">
            {partyData.recruitType}
          </div>
          <div
            className={`text-sm font-medium py-1 ${partyData.inProgress ? 'card-border px-3' : 'pl-3 pr-2'}`}
          >
            {partyData.inProgress ? '진행중' : '모집완료'}
          </div>
        </div>
      </div>
      <Link href={`/party/${partyData.id}`}>
        <div className="px-6 pt-[10px] flex-1 flex flex-col">
          <span className="font-semibold text-lg mb-3">{partyData.title}</span>
          <div className="flex gap-2 flex-wrap">
            {[partyData.tags.place, partyData.tags.role, partyData.tags.method].map((tag) =>
              tag ? <Tag name={tag} key={`${partyData.id}/${tag}`} /> : null
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PartyItem
