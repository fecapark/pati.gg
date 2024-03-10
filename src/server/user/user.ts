import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore'
import { Session } from 'next-auth'

import { DBUserData, ExtraUserData, ResponseDBUserData } from '@/types/user'
import { toDBLocaleDate } from '@/utils/date'

import db from '../firebase'

export const getExtraUserData = (
  session: Session,
  userData: ExtraUserData,
  recentUserData: DBUserData | null
): ResponseDBUserData => {
  return {
    id: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    avatar: session.user.image ?? null,
    mapleworldTag: userData.tag,
    mapleworldName: userData.mapleworldName,
    maplelandName: userData.name,
    job: userData.job,
    level: userData.level,
    reportedCount:
      recentUserData && recentUserData.reportedCount !== undefined
        ? recentUserData.reportedCount
        : 0,
    banned: recentUserData && recentUserData.banned !== undefined ? recentUserData.banned : false,
    postedAt:
      recentUserData && recentUserData.postedAt !== undefined
        ? Timestamp.fromDate(recentUserData.postedAt)
        : Timestamp.fromDate(new Date(0)),
  }
}

export const getUserData = async (id: string): Promise<DBUserData | null> => {
  const userDocRef = doc(db, 'users', id)
  const data = (await getDoc(userDocRef)).data() as ResponseDBUserData | undefined

  if (!data) return null

  const newData = { ...data, postedAt: toDBLocaleDate(data.postedAt) }
  return newData
}

export const setExtraUserData = async (
  session: Session,
  userData: ExtraUserData
): Promise<DBUserData> => {
  const recentUserData = await getUserData(session.user.id)
  const newUserData = getExtraUserData(session, userData, recentUserData)

  const userDocRef = doc(db, 'users', session.user.id)
  await setDoc(userDocRef, newUserData, { merge: true })

  return { ...newUserData, postedAt: toDBLocaleDate(newUserData.postedAt) }
}

export const setUserPostedNow = async (id: string) => {
  const userDocRef = doc(db, 'users', id)
  await setDoc(userDocRef, { postedAt: Timestamp.now() }, { merge: true })
}
