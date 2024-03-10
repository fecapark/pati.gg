import { Timestamp } from 'firebase/firestore'

export interface ExtraUserData {
  tag: string
  mapleworldName: string
  name: string
  job: string
  level: number
}

interface BaseDBUserData {
  mapleworldTag: string
  mapleworldName: string
  maplelandName: string
  id: string
  name: string | null
  email: string | null
  avatar: string | null
  job: string
  level: number
}

export interface ResponseDBUserData extends BaseDBUserData {
  reportedCount: number
  banned: boolean
  postedAt: Timestamp
}

export interface DBUserData extends BaseDBUserData {
  reportedCount: number
  banned: boolean
  postedAt: Date
}
