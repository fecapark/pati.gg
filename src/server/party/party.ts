import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  doc,
  getDocs,
  limit,
  orderBy,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'

import { DBPartyData, ResponsedPartyData } from '@/types/party'
import { MethodType, RecruitType, RoleType } from '@/types/tag'

import db from '../firebase'

import {
  getDocsArray,
  getWhereQueriesAsSearchQuery,
  makeCollectionQuery,
  parseResponsedPartyData,
} from './utils'

export const getRecentParties = async (amount: number): Promise<DBPartyData[]> => {
  const q = makeCollectionQuery(orderBy('createdAt', 'desc'), limit(amount))
  const { docs } = await getDocsArray<ResponsedPartyData>(q)

  return docs.map((data) => parseResponsedPartyData(data))
}

export const getPaginatedRecentParties = async (
  amount: number,
  cursor?: QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<QuerySnapshot<DocumentData, DocumentData>> => {
  const q = makeCollectionQuery(
    orderBy('createdAt', 'desc'),
    cursor ? startAfter(cursor) : null,
    limit(amount)
  )

  return getDocs(q)
}

export const getPartyDataById = async (id: string): Promise<DBPartyData | null> => {
  const q = makeCollectionQuery(where('id', '==', id))
  const { docs } = await getDocsArray<ResponsedPartyData>(q)

  if (docs.length > 0) {
    return parseResponsedPartyData(docs[0])
  }

  return null
}

export const getSepecificUserParties = async (
  userToken: string,
  amount: number,
  cursor?: QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<QuerySnapshot<DocumentData, DocumentData>> => {
  const q = makeCollectionQuery(
    where('author', '==', userToken),
    orderBy('createdAt', 'desc'),
    cursor ? startAfter(cursor) : null,
    limit(amount)
  )

  return getDocs(q)
}

export const getSearchedParties = async (
  searchQuery: {
    place: string | null
    role: RoleType | null
    method: MethodType | null
    recruit: RecruitType | null
  },
  amount: number,
  cursor?: QueryDocumentSnapshot<DocumentData, DocumentData>
): Promise<QuerySnapshot<DocumentData, DocumentData>> => {
  const q = makeCollectionQuery(
    ...getWhereQueriesAsSearchQuery(searchQuery),
    orderBy('createdAt', 'desc'),
    cursor ? startAfter(cursor) : null,
    limit(amount)
  )

  return getDocs(q)
}

export const getWorkOffRoleParties = async (role: RoleType): Promise<DBPartyData[]> => {
  const q = makeCollectionQuery(
    where('tags.role', '==', role),
    orderBy('createdAt', 'desc'),
    limit(5)
  )
  const { docs } = await getDocsArray<ResponsedPartyData>(q)

  return docs.map((data) => parseResponsedPartyData(data))
}

export const setPartyData = async (partyData: DBPartyData) => {
  const newPartyData: ResponsedPartyData = {
    ...partyData,
    createdAt: Timestamp.fromDate(partyData.createdAt),
    updatedAt: partyData.updatedAt ? Timestamp.fromDate(partyData.updatedAt) : null,
  }
  const userDocRef = doc(db, 'parties', partyData.id)
  await setDoc(userDocRef, newPartyData, { merge: true })
}

export const setPartyProgress = async (partyId: string, value: boolean) => {
  const partyRef = doc(db, 'parties', partyId)
  await setDoc(partyRef, { inProgress: value }, { merge: true })
}
