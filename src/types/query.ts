import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'

export type TPartyInfiniteQueryData = QuerySnapshot<DocumentData, DocumentData>
export type TPartyInfiniteQueryPageParam = QueryDocumentSnapshot<DocumentData, DocumentData>
export type TPartyInfiniteQueryKey = any[]
