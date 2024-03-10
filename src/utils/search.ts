import * as Hangul from 'hangul-js'

import { searchTags, tags } from '@/shared/const'
import { BaseTagData } from '@/types/tag'

const searchTagDatas = (text: string, ignores: string[] = []): BaseTagData[] => {
  const search = (target: string, base: string) => {
    // 1. 검색 대상이 검색어를 포함하고 있는가?
    if (target.includes(base)) return true
    // 2. 공백을 제거했을때 검색 대상이 검색어를 포함하고 있는가?
    if (target.replaceAll(' ', '').includes(base.replaceAll(' ', ''))) return true
    // 3. 한글의 자음 모음을 분리했을 때 검색 대상이 검색어를 포함하고 있는가?
    if (
      Hangul.disassemble(target)
        .filter((char) => char !== ' ')
        .join('')
        .includes(
          Hangul.disassemble(base)
            .filter((char) => char !== ' ')
            .join('')
        )
    )
      return true

    return false
  }

  const allTags = [...Object.values(tags).flat(), ...Object.values(searchTags).flat()]
  const preProcessedText = text.trim()

  if (preProcessedText === '') return []
  return allTags.filter(({ keywords, section }) => {
    if (ignores.includes(section)) return false
    if (keywords.some((keyword) => search(keyword, preProcessedText))) return true
    if (search(section, preProcessedText)) return true
    return false
  })
}

const dummy = null

export { searchTagDatas, dummy }
