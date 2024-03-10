'use client'

import { useState } from 'react'

import SearchContainer from './SearchContainer'
import SearchTrigger from './SearchTrigger'

const HeaderSearch = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <SearchContainer isActive={isActive} setIsActive={setIsActive} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SearchTrigger setIsActive={setIsActive} />
      </div>
    </>
  )
}

export default HeaderSearch
