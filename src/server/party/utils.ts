import {
  DocumentData,
  Query,
  QueryConstraint,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

import { DBPartyData, ResponsedPartyData } from '@/types/party'
import { MethodType, RecruitType, RoleType } from '@/types/tag'
import { toDBLocaleDate } from '@/utils/date'

import db from '../firebase'

const getPartiesCollection = () => {
  return collection(db, 'parties')
}

export const makeCollectionQuery = (...queryConstraints: Array<QueryConstraint | null>) => {
  const filtered: QueryConstraint[] = queryConstraints.filter((queryConstraint) => {
    return queryConstraint !== null
  }) as QueryConstraint[]

  return query(getPartiesCollection(), ...filtered)
}

export const getDocsArray = async <T>(docQuery: Query<DocumentData, DocumentData>) => {
  const docs: T[] = []
  const querySnapshot = await getDocs(docQuery)
  querySnapshot.forEach((queriedDoc) => {
    docs.push(queriedDoc.data() as T)
  })
  return { docs, querySnapshot }
}

export const parseResponsedPartyData = (data: ResponsedPartyData): DBPartyData => {
  const createdAt = toDBLocaleDate(data.createdAt)
  const updatedAt = data.updatedAt ? toDBLocaleDate(data.updatedAt) : null
  return {
    ...data,
    createdAt,
    updatedAt,
  }
}

export const getDatasFromSnapshot = (querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
  const docs: ResponsedPartyData[] = []
  querySnapshot.forEach((queriedDoc) => {
    docs.push(queriedDoc.data() as ResponsedPartyData)
  })
  return docs.map((data) => parseResponsedPartyData(data))
}

export const getWhereQueriesAsSearchQuery = (searchQuery: {
  place: string | null
  role: RoleType | null
  method: MethodType | null
  recruit: RecruitType | null
}) => {
  const whereArray = []

  if (searchQuery.place) {
    whereArray.push(where('tags.place', '==', searchQuery.place))
  }
  if (searchQuery.role) {
    whereArray.push(where('tags.role', '==', searchQuery.role))
  }
  if (searchQuery.method) {
    whereArray.push(where('tags.method', '==', searchQuery.method))
  }
  if (searchQuery.recruit) {
    whereArray.push(where('recruitType', '==', searchQuery.recruit))
  }

  return whereArray
}
