import Link from 'next/link'

import Tag from '@/components/shared/Tag/Tag'
import AutoHeightImage from '@/components/utils/AutoHeightImage/AutoHeightImage'
import { tags } from '@/shared/const'
import { TagDataWithLocation } from '@/types/tag'

const LocatedSection = ({
  title,
  iconSrc,
  datas,
}: {
  title: string
  iconSrc: string
  datas: TagDataWithLocation[]
}) => {
  return (
    <div>
      <div className="mb-3 flex-center">
        <div className="w-[24px] mr-2">
          <AutoHeightImage src={iconSrc} alt="" />
        </div>
        <span className="font-medium text-[15px]">{title}</span>
      </div>
      <div className="flex flex-col gap-2">
        {datas.map((tag) => (
          <div className="flex">
            <Link href={`/search?place=${tag.name}`} key={tag.name}>
              <Tag name={tag.name} big />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const TagCloud = () => {
  const sectionNames = [
    ['엘리니아', '/imgs/ellinia.png'],
    ['페리온', '/imgs/perion.png'],
    ['커닝시티', '/imgs/kerningcity.webp'],
    ['슬리피우드', '/imgs/sleepywood.webp'],
    ['플로리나비치', '/imgs/florina.png'],
    ['오르비스', '/imgs/orbis.png'],
    ['엘나스', '/imgs/elnas.png'],
  ]

  return (
    <div className="w-full mx-auto flex-wrap flex align-top justify-center gap-12 pt-8 mb-14">
      {sectionNames.map(([sectionName, iconSrc]) => (
        <LocatedSection
          key={sectionName}
          title={sectionName}
          iconSrc={iconSrc}
          datas={tags.places.filter((tag) => tag.location === sectionName)}
        />
      ))}
    </div>
  )
}

export default TagCloud
