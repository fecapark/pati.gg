import { Metadata } from 'next'

import SearchContainer from './_hooks/SearchContainer'

export const metadata: Metadata = {
  title: '검색 결과 - 파티지지 pati.gg',
  description: '메이플랜드 Mapleland 에서 같이 활동할 파티원들을 찾아보세요.',
}

const SearchPage = () => {
  return <SearchContainer />
}

export default SearchPage
