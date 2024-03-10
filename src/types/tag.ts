export type RoleType = '나무꾼' | '설거지'
export type MethodType = '닫섭' | '환채' | '섭뚫'
export type RecruitType = '구인' | '구직'

export interface TagResponseData {
  name: string
  tag: string
  avatar: string | null
  playedMapleland: boolean
  success: boolean | null
}

export interface BaseTagData {
  name: string
  keywords: string[]
  color: string
  section: string
}

export interface TagDataWithLocation extends BaseTagData {
  location: string
}

export type TagCollection = {
  places: TagDataWithLocation[]
  role: BaseTagData[]
  methods: BaseTagData[]
  partyquests: BaseTagData[]
}

export type SearchTagCollection = {
  recruit: BaseTagData[]
}
