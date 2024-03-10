'use client'

import { useMemo } from 'react'

import '@szhsin/react-menu/dist/index.css'
import '@/styles/menu.css'

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { notFound, usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { FaDiscord } from 'react-icons/fa'
import { MdMoreVert, MdPeople, MdPerson } from 'react-icons/md'

import Report from '@/components/layouts/Modal/contents/Report'
import Tag from '@/components/shared/Tag/Tag'
import AutoHeightImage from '@/components/utils/AutoHeightImage/AutoHeightImage'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import NewWindowLink from '@/components/utils/NewWindowLink/NewWindowLink'
import useModal from '@/hooks/useModal'
import { getPartyDataById, setPartyProgress } from '@/server/party/party'
import { getUserData } from '@/server/user/user'
import { DBPartyData } from '@/types/party'
import { UserPositionInfo } from '@/types/post'
import { parseAvatarSource } from '@/utils/avatar'

interface PartyPostContainerProps {
  session: Session | null
}

const PrivateMenuItems = ({
  data,
  className,
  onEndProgress,
}: {
  data: DBPartyData
  className: ({ hover }: { hover: boolean }) => string
  onEndProgress: () => Promise<void>
}) => {
  return (
    <>
      <MenuItem className={className}>
        <Link href={`/post/edit/${data.id}`}>수정하기</Link>
      </MenuItem>
      {data.inProgress ? (
        <MenuItem className={className} onClick={onEndProgress}>
          모집완료하기
        </MenuItem>
      ) : null}
    </>
  )
}

const PartyHeader = ({
  data,
  session,
  refetch,
}: {
  data: DBPartyData
  session: Session | null
  refetch: () => void
}) => {
  const setReportModal = useModal({
    title: '신고하기',
    content: <Report onlyReportContent />,
  })

  const menuItemClassName = ({ hover }: { hover: boolean }) =>
    hover ? 'menu-item-hover' : 'menu-item'

  const getParsedCreatedAt = () => {
    const now = new Date()
    const elapsed = now.getTime() - data.createdAt.getTime()
    const elapsedMinutes = Math.floor(elapsed / 1000 / 60)

    if (elapsedMinutes < 1) return '방금 전'
    if (elapsedMinutes < 60) return `${elapsedMinutes}분 전`
    if (elapsedMinutes < 60 * 24) return `${Math.floor(elapsedMinutes / 60)}시간 전`
    if (elapsedMinutes < 60 * 24 * 30) return `${Math.floor(elapsedMinutes / 60 / 24)}일 전`
    return '오래 전'
  }

  const onEndProgress = async () => {
    if (data.inProgress === false) return

    await setPartyProgress(data.id, false)
    refetch()
  }

  return (
    <div>
      <div className="flex justify-between items-start w-full pt-[40px] mb-5">
        <div className="flex items-center gap-2 mb-3">
          <NewWindowLink href={`/profile/${data.author}`} noStyle>
            <div className="flex items-center gap-2">
              <div className="w-[28px] rounded-[50%] overflow-hidden">
                <AutoHeightImage src={parseAvatarSource(data.avatar)} alt="" />
              </div>
              <div className="font-semibold text-sm">{data.authorName}</div>
            </div>
          </NewWindowLink>
          <div className="w-[2px] h-[2px] rounded-[5px] bg-[#c2c2c5]" />
          <div className="text-sm text-[#c2c2c5]">{getParsedCreatedAt()}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="card-border card-bg px-3 py-1 font-medium text-sm">
            {data.recruitType}
          </div>
          <div
            className={`text-sm font-medium py-1 ${data.inProgress ? 'card-border px-3' : 'pl-3 pr-2'}`}
          >
            {data.inProgress ? '진행중' : '모집완료'}
          </div>
          <Menu
            menuButton={
              <MenuButton className="p-2 flex-center hover:bg-[#ffffff22] rounded-[50%] cursor-pointer">
                <IconWrapper className="text-2xl">
                  <MdMoreVert />
                </IconWrapper>
              </MenuButton>
            }
            menuClassName="party-menu"
          >
            {session && session.user.id === data.author ? (
              <PrivateMenuItems
                data={data}
                className={menuItemClassName}
                onEndProgress={onEndProgress}
              />
            ) : null}
            <MenuItem className={menuItemClassName} onClick={() => setReportModal(true)}>
              신고하기
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}

const EmptyPositionItem = () => {
  return (
    <div className="card-bg card-border flex-center">
      <span className="text-[#707580]">작성자님이 사냥 위치를 지정하지 않았어요.</span>
    </div>
  )
}

const PositionItem = ({ positionInfo }: { positionInfo: UserPositionInfo }) => {
  if (positionInfo.job === null) {
    return (
      <div className="card-bg card-border flex-center">
        <span className="text-[#707580]">공석</span>
      </div>
    )
  }

  return (
    <div className="card-bg card-border flex-center">
      <div className="flex-center flex-col">
        <span className="text-sm font-semibold mb-1">{positionInfo.job}</span>
        <span className="text-sm font-medium text-[#b2b2b5]">Lv. {positionInfo.level}</span>
      </div>
    </div>
  )
}

const PositionTable = ({ positionData }: { positionData: Record<number, UserPositionInfo[]> }) => {
  const positions = useMemo(() => {
    const data: UserPositionInfo[][] = []
    Object.entries(positionData)
      .sort(([a], [b]) => Number(a) - Number(b))
      .forEach(([, value]) => {
        data.push(value)
      })
    return data
  }, [positionData])

  return (
    <>
      <div className="mb-5 flex items-center text-[#c3c3c6]">
        <IconWrapper className="text-xl mr-2">
          <MdPeople />
        </IconWrapper>
        <span className="font-medium text-[15px]">파티원별 사냥 위치</span>
      </div>
      <div
        className="max-w-[600px] w-full gap-2"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${positions[0]?.length ?? 1}, 1fr)`,
          gridTemplateRows: `repeat(${Math.max(positions.length, 1)}, minmax(100px, 1fr))`,
        }}
      >
        {positions.length === 0 ? (
          <EmptyPositionItem />
        ) : (
          positions.map((row, i) =>
            row.map((col, j) => <PositionItem key={`${i}-${j}`} positionInfo={col} />)
          )
        )}
      </div>
    </>
  )
}

const PartyContent = ({ content }: { content: string }) => {
  const contents = useMemo(() => {
    const lines = content.split('\n')

    return lines.map((line, i) => {
      if (line === '') {
        return <p key={i} className="h-4" />
      }
      return (
        <p key={i} className="text-[#e0e3e9]">
          {line}
        </p>
      )
    })
  }, [content])

  return <div className="mb-8 text-[#e0e3e9] text-[17px]">{contents}</div>
}

const UserCharacterInfo = ({ userToken }: { userToken: string }) => {
  const { data: profileData } = useQuery({
    queryKey: ['profile-user-data', userToken],
    queryFn: async () => getUserData(userToken),
    placeholderData: undefined,
  })

  if (!profileData) {
    return null
  }

  return (
    <div className="w-full mb-10">
      <div className="mb-3 flex items-center text-[#c3c3c6]">
        <IconWrapper className="text-xl mr-2">
          <MdPerson />
        </IconWrapper>
        <span className="font-medium text-[15px]">작성자님의 캐릭터 정보</span>
      </div>
      <div className="flex flex-col items-start">
        <div className="mb-2 pl-2">
          <span className="font-semibold text-lg">{profileData.maplelandName}</span>
        </div>
        <div className="card-border card-bg flex text-sm font-semibold text-[#e0e0e0] py-1 px-4">
          <span className="mr-2">Lv. {profileData.level}</span>
          <span>{profileData.job}</span>
        </div>
      </div>
    </div>
  )
}

const PartyPostContainer = ({ session }: PartyPostContainerProps) => {
  const pathname = usePathname()
  const pathToken = pathname.split('/').at(2) || ''

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['party', pathToken],
    queryFn: () => getPartyDataById(pathToken),
    placeholderData: undefined,
  })

  if (isLoading || data === undefined) {
    return null
  }

  if (data === null) {
    notFound()
  }

  return (
    <>
      <PartyHeader data={data} session={session} refetch={refetch} />
      <div className="mb-4">
        <span className="font-medium text-[26px] leading-normal">{data.title}</span>
      </div>
      <PartyContent content={data.content} />
      <div className="flex w-full items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          {[data.tags.place, data.tags.role, data.tags.method].map((tag) =>
            tag ? <Tag name={tag} key={`${data.id}/${tag}`} big /> : null
          )}
        </div>
        <NewWindowLink noStyle href={`https://discord.com/users/${data.author}`}>
          <div className="flex-center rounded-lg bg-discord-primary px-4 py-2 mr-2">
            <IconWrapper className="mr-2 text-xl">
              <FaDiscord />
            </IconWrapper>
            <span className="text-sm font-semibold">디스코드 프로필</span>
          </div>
        </NewWindowLink>
      </div>
      <div className="mt-10 pt-10 border-t-[1px] border-separator-primary">
        <UserCharacterInfo userToken={data.author} />
        <PositionTable positionData={data.positions} />
      </div>
    </>
  )
}

export default PartyPostContainer
