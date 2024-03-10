import { useMemo } from 'react'

import { useSearchParams } from 'next/navigation'

import { searchTags, tags } from '@/shared/const'
import { MethodType, RecruitType, RoleType } from '@/types/tag'

interface SearchQueryParams {
  place: string | null
  role: RoleType | null
  method: MethodType | null
  recruit: '구인' | '구직' | null
}

const useSearchQueryParams = () => {
  const searchParams = useSearchParams()

  const params: SearchQueryParams = useMemo(() => {
    const place = searchParams.get('place')
    const role = searchParams.get('role') as RoleType | null
    const method = searchParams.get('method') as MethodType | null
    const recruit = searchParams.get('recruit') as RecruitType | null
    return { place, role, method, recruit }
  }, [searchParams])

  const isValidQueryValue = (
    keys: Array<keyof typeof tags> | Array<keyof typeof searchTags>,
    queryValue: string
  ) => {
    const alls: string[] = []
    keys.forEach((key) => {
      alls.push(...{ ...tags, ...searchTags }[key].map((tag) => tag.name))
    })
    return alls.includes(queryValue)
  }

  const isValidParams = () => {
    const { place, role, method, recruit } = params
    if (place && !isValidQueryValue(['places', 'partyquests'], place)) return false
    if (role && !isValidQueryValue(['role'], role)) return false
    if (method && !isValidQueryValue(['methods'], method)) return false
    if (recruit && !isValidQueryValue(['recruit'], recruit)) return false
    return true
  }

  return {
    params,
    isValid: isValidParams(),
  }
}

export default useSearchQueryParams
