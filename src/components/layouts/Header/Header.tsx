import Link from 'next/link'

import HeaderSearch from '@/components/shared/Search/HeaderSearch'
import AutoHeightImage from '@/components/utils/AutoHeightImage/AutoHeightImage'

import HeaderProfileSession from './HeaderProfileSession'

const Header = async () => {
  return (
    <header className="px-6 sticky top-0 w-full bg-[#1f2123] z-40">
      <div className="flex justify-between items-center relative">
        <div className="flex items-center">
          <div className="w-[140px] py-2 mr-12">
            <Link href="/">
              <AutoHeightImage src="/logo.webp" alt="logo" />
            </Link>
          </div>
          <div className="flex gap-10 text-lg font-bold" />
        </div>
        <HeaderSearch />
        <HeaderProfileSession />
      </div>
    </header>
  )
}

export default Header
