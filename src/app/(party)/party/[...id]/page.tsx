import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import PartyPostContainer from '@/app/(party)/party/[...id]/_components/PartyPostContainer'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { getPartyDataById } from '@/server/party/party'

interface PageProps {
  params: { id: string[] }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params
  const partyData = await getPartyDataById(id[0])

  return {
    title:
      partyData === null ? '파티 글을 찾을 수 없습니다.' : `${partyData.title} - 파티지지 pati.gg`,
    description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
  }
}

const PartyPage = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="w-full">
      <div className="max-w-[900px] w-full mx-auto">
        <PartyPostContainer session={session} />
      </div>
    </div>
  )
}

export default PartyPage
