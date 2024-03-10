import { Timestamp } from 'firebase/firestore'

export const toDBLocaleDate = (timestamp: Timestamp): Date => {
  return new Date(timestamp.toDate().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
}

export const dummy = null
