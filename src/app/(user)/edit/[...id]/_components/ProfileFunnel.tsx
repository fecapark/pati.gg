'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { MdInfo } from 'react-icons/md'
import Select from 'react-select'
import { useSetRecoilState } from 'recoil'

import Funnel from '@/components/utils/Funnel/Funnel'
import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import NewWindowLink from '@/components/utils/NewWindowLink/NewWindowLink'
import { setExtraUserData } from '@/server/user/user'
import { isFunnelCanGoNextAtom, userDataAtom } from '@/shared/atom'
import { jobOptions } from '@/shared/const'

interface ProfileFunnelProps {
  session: Session | null
}

const UserTagForm = ({
  setMapleWorldData,
}: {
  setMapleWorldData: Dispatch<SetStateAction<{ tag: string; name: string }>>
}) => {
  const [tag, setTag] = useState('')
  const [name, setName] = useState('')
  const setIsFunnelCanGoNext = useSetRecoilState(isFunnelCanGoNextAtom)

  const isNameValid = name.length >= 2 && name.length <= 16
  const isTagValid = tag.length >= 4 && tag.length <= 6

  const onTagChange = (e: React.ChangeEvent) => {
    setTag((e.target as HTMLInputElement).value.trim().replaceAll('#', ''))
  }

  const onNameChange = (e: React.ChangeEvent) => {
    setName((e.target as HTMLInputElement).value.trim())
  }

  useEffect(() => {
    if (isNameValid && isTagValid) {
      setMapleWorldData({ tag, name })
      setIsFunnelCanGoNext(true)
    } else {
      setIsFunnelCanGoNext(false)
    }
  }, [tag, name, isNameValid, isTagValid, setMapleWorldData, setIsFunnelCanGoNext])

  return (
    <div>
      <div className="flex items-start flex-col">
        <div className="flex flex-col mb-8">
          <span className="text-2xl font-semibold mb-1">
            메이플스토리 월드 본인 계정의
            <br />
            태그를 입력해주세요.
          </span>
          <span className="text-[#b2b2b6]">
            계정 태그는{' '}
            <NewWindowLink href="https://maplestoryworlds.nexon.com/ko/play">
              메이플스토리 월드
            </NewWindowLink>{' '}
            의 계정 프로필에서 확인할 수 있어요.
          </span>
        </div>
        <div className="flex flex-col gap-1 w-full mb-10">
          <span className="text-[15px] font-medium text-[#d2d2d6] mb-1">
            메이플월드 유저 태그 (# 제외) *
          </span>
          <input
            type="text"
            value={tag}
            onChange={onTagChange}
            className={`w-full pb-1 pl-1 font-medium bg-transparent border-b-2 ${isTagValid ? 'border-accent-blue' : 'border-[#323238]'} focus:border-accent-blue`}
            style={{ transition: 'border-color 0.15s cubic-bezier(0.2, 0, 0, 1)' }}
          />
        </div>
        <div className="flex flex-col gap-1 w-full mb-10">
          <span className="text-[15px] font-medium text-[#d2d2d6] mb-1">
            메이플월드 유저 닉네임*
          </span>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            className={`w-full pb-1 pl-1 font-medium bg-transparent border-b-2 ${isNameValid ? 'border-accent-blue' : 'border-[#323238]'} focus:border-accent-blue`}
            style={{ transition: 'border-color 0.15s cubic-bezier(0.2, 0, 0, 1)' }}
          />
        </div>
        {/* <TagAuthInput
          setMapleWorldData={setMapleWorldData}
          setIsAuthenticated={setIsFunnelCanGoNext}
        /> */}
      </div>
    </div>
  )
}

const InGameUserForm = ({
  setUserData,
}: {
  setUserData: Dispatch<SetStateAction<{ name: string; job: string; level: number }>>
}) => {
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const [level, setLevel] = useState(0)
  const setIsFunnelCanGoNext = useSetRecoilState(isFunnelCanGoNextAtom)

  const onNameChange = (e: React.ChangeEvent) => {
    setName((e.target as HTMLInputElement).value)
  }

  const onLevelChange = (e: React.ChangeEvent) => {
    const changedLevel = parseInt((e.target as HTMLInputElement).value, 10)
    setLevel(Math.max(1, Math.min(changedLevel, 200)))
  }

  const isNameValid = name.length > 0
  const isLevelValid = level > 0

  useEffect(() => {
    if (isNameValid && job !== '' && isLevelValid) {
      setUserData({ name, job, level })
      setIsFunnelCanGoNext(true)
    } else {
      setIsFunnelCanGoNext(false)
    }
  }, [name, isNameValid, isLevelValid, job, level, setUserData, setIsFunnelCanGoNext])

  return (
    <div className="flex items-start flex-col">
      <div className="flex flex-col mb-8">
        <span className="text-2xl font-semibold mb-1">
          메이플랜드의 캐릭터 정보를 입력해주세요.
        </span>
        <span className="text-[#e0e0e0]">사람들이 보게 될 본인의 캐릭터 정보를 입력해주세요.</span>
      </div>
      <div className="w-full pt-3">
        <div className="flex flex-col gap-1 w-full mb-10">
          <span className="text-[15px] font-medium text-[#d2d2d6] mb-1">
            메이플랜드 캐릭터 닉네임*
          </span>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            className={`w-full pb-1 pl-1 font-medium bg-transparent border-b-2 ${isNameValid ? 'border-accent-blue' : 'border-[#323238]'} focus:border-accent-blue`}
            style={{ transition: 'border-color 0.15s cubic-bezier(0.2, 0, 0, 1)' }}
          />
        </div>
        <div className="flex flex-col gap-1 w-full mb-10">
          <span className="text-[15px] font-medium text-[#d2d2d6] mb-2">캐릭터 직업*</span>
          <Select
            options={jobOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: '1px solid #626266',
                borderColor: state.isFocused ? '#2d7ceb' : '#626266',
                borderRadius: '0.5em',
                backgroundColor: '#1f1f22',
              }),
              singleValue: (baseStyles) => ({ ...baseStyles, color: 'white' }),
              menu: (baseStyles) => ({
                ...baseStyles,
                border: '1px solid #626266',
                borderRadius: '0.5em',
                backgroundColor: '#1f1f22',
                // padding: '0.5em',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected ? '#2d7ceb' : 'transparent',
                paddingTop: '0.75em',
                paddingBottom: '0.75em',
              }),
              container: (baseStyles) => ({ ...baseStyles }),
            }}
            onChange={(value) => setJob(value?.label ?? '')}
            placeholder="캐릭터 직업을 선택하세요..."
          />
        </div>
        <div className="flex flex-col gap-1 w-full mb-10">
          <span className="text-[15px] font-medium text-[#d2d2d6] mb-1">캐릭터 레벨*</span>
          <input
            type="number"
            value={level}
            min={1}
            max={200}
            onChange={onLevelChange}
            className={`w-full pb-1 pl-1 font-medium bg-transparent border-b-2 ${isLevelValid ? 'border-accent-blue' : 'border-[#323238]'} focus:border-accent-blue`}
            style={{ transition: 'border-color 0.15s cubic-bezier(0.2, 0, 0, 1)' }}
          />
        </div>
      </div>
      <div className="flex items-center text-[#a0a0a0]">
        <IconWrapper className="mr-3 text-xl">
          <MdInfo />
        </IconWrapper>
        <span className="text-sm">
          올바르지 않은 정보 입력 시, <br />
          서비스 이용이 제한되거나 정지될 수 있습니다.
        </span>
      </div>
    </div>
  )
}

const ProfileFunnel = ({ session }: ProfileFunnelProps) => {
  const [mapleWorldData, setMapleWorldData] = useState({
    tag: '',
    name: '',
  })
  const [userData, setUserData] = useState({
    name: '',
    job: '',
    level: 0,
  })
  const setDBUserData = useSetRecoilState(userDataAtom)
  const router = useRouter()

  if (!session) return null

  return (
    <div>
      <Funnel
        onResult={async () => {
          const extraUserData = {
            tag: mapleWorldData.tag,
            mapleworldName: mapleWorldData.name,
            name: userData.name,
            job: userData.job,
            level: userData.level,
          }
          const recentUserData = await setExtraUserData(session, extraUserData)
          setDBUserData(recentUserData)

          router.push(`/profile/${session.user.id}`)
        }}
      >
        <UserTagForm setMapleWorldData={setMapleWorldData} />
        <InGameUserForm setUserData={setUserData} />
      </Funnel>
    </div>
  )
}

export default ProfileFunnel
