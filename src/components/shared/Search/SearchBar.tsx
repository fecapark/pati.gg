import { MdSearch } from 'react-icons/md'

import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'
import { BaseTagData } from '@/types/tag'

import Tag from '../Tag/Tag'

interface SearchBarProps {
  text: string
  selectedDatas: BaseTagData[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchBar = ({ text, selectedDatas, onChange, onKeyDown }: SearchBarProps) => {
  return (
    <div className="flex-center w-full p-2">
      <div className="flex-center">
        <IconWrapper className="text-2xl p-2 text-[#c2c2c6]">
          <MdSearch />
        </IconWrapper>
      </div>
      <div className="w-full flex flex-wrap items-center">
        <div className="flex flex-wrap gap-2">
          {selectedDatas.map((tag) => (
            <Tag name={tag.name} key={tag.name} big />
          ))}
        </div>
        <div className="flex-1 ml-2">
          <input
            className="bg-transparent w-full min-w-[80px] pr-5"
            type="text"
            value={text}
            onChange={onChange}
            onKeyDown={onKeyDown}
            autoFocus
            placeholder="태그를 입력해 파티 글을 검색하세요..."
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
