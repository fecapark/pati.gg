'use client'

import { useEffect, useState } from 'react'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { DocumentData, QuerySnapshot } from 'firebase/firestore'
import { useInView } from 'react-intersection-observer'

import { getDatasFromSnapshot } from '@/server/party/utils'
import { DBPartyData } from '@/types/party'
import {
  TPartyInfiniteQueryData,
  TPartyInfiniteQueryKey,
  TPartyInfiniteQueryPageParam,
} from '@/types/query'

interface UsePartiesInfiniteQueryProps {
  queryKey: TPartyInfiniteQueryKey
  queryFn: (
    pageParam?: TPartyInfiniteQueryPageParam
  ) => Promise<QuerySnapshot<DocumentData, DocumentData>>
  pagingSize: number
}

const usePartiesInfiniteQuery = ({
  queryKey,
  queryFn,
  pagingSize,
}: UsePartiesInfiniteQueryProps) => {
  const { ref, inView } = useInView()
  const [datas, setDatas] = useState<DBPartyData[]>([])

  const initialQueryFn = async () => {
    const snapshot = await queryFn()
    setDatas(getDatasFromSnapshot(snapshot))
    return snapshot
  }

  const nextQueryFn = async (pageParam: TPartyInfiniteQueryPageParam) => {
    const snapshot = await queryFn(pageParam)
    setDatas((prev) => {
      return [...prev, ...getDatasFromSnapshot(snapshot)]
    })
    return snapshot
  }

  const getNextPageParam = (querySnapshot: TPartyInfiniteQueryData) => {
    const lastPageParam = querySnapshot.docs[querySnapshot.docs.length - 1]
    if (querySnapshot.size < pagingSize) {
      return undefined
    }
    return lastPageParam
  }

  const { isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery<
    TPartyInfiniteQueryData,
    Error,
    InfiniteData<TPartyInfiniteQueryData, unknown>,
    TPartyInfiniteQueryKey,
    TPartyInfiniteQueryPageParam | 'initial'
  >({
    queryKey,
    queryFn: async ({ pageParam }) =>
      pageParam === 'initial' ? initialQueryFn() : nextQueryFn(pageParam),
    getNextPageParam,
    initialPageParam: 'initial',
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, hasNextPage])

  return {
    datas,
    isFetchingNextPage,
    initialLoading: isLoading && !isFetchingNextPage,
    fetchRef: ref,
  }
}

export default usePartiesInfiniteQuery
