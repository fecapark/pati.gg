import { Timestamp } from 'firebase/firestore'

import { UserPositionInfo } from './post'
import { MethodType, RoleType } from './tag'

interface BasePartyData {
  id: string
  author: string
  authorName: string
  avatar: string | null
  recruitType: '구인' | '구직'
  title: string
  tags: {
    place: string | null
    role: RoleType | null
    method: MethodType | null
  }
  content: string
  positions: Record<number, UserPositionInfo[]>
  inProgress: boolean
}

export interface ResponsedPartyData extends BasePartyData {
  createdAt: Timestamp
  updatedAt: Timestamp | null
}

export interface DBPartyData extends BasePartyData {
  createdAt: Date
  updatedAt: Date | null
}
