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
    [
      '엘리니아',
      'https://i.namu.wiki/i/C-1YQOMDVcJyyjUk6PrlpnlOgk1zDAR4KBjT3c7_ptxxxGXsb8dp2OdoFwUmZNcUBMC1qpLHK6SEWpMzyLrWEw.png',
    ],
    [
      '페리온',
      'https://i.namu.wiki/i/zdULztpeC4GezDtL25o6aHXf4GtfxH7Aj-Evm4zxPwITzJROddEGe1CEP71DO0Q-GM3UV1Va9uMqeBEXuYU5eA.png',
    ],
    [
      '커닝시티',
      'https://i.namu.wiki/i/bNZ6lWom-k5KenpRRYbnjzJQNJ8NgKbWoF-90jllk8dlzGD5qpGczRFGM_-0zFddrwcSDnsTbbT9O8LY4tod1A.webp',
    ],
    [
      '슬리피우드',
      'https://i.namu.wiki/i/-bPu3RvRP7g-Fvdblm-6aWoAgLEyZpGUVbKVLOE60QfHZU0RzM0X3UKX36rEfDVlkzPIf7JGvHdbhIl0lWb8Mg.webp',
    ],
    [
      '플로리나비치',
      'https://i.namu.wiki/i/PRFd-Ms-g-i0vBZkh1DHhDhVPoA7A4YJ1CGqk7uqReKw3TRg5vErxSCjpmPFTgUW0IuSUWGj4XDwzfZulqJIIw.png',
    ],
    [
      '오르비스',
      'https://i.namu.wiki/i/aZU74JBpdRJBuceuMarZT21a486EnPStjutXOhZMQZsiXFOVgpIQ9I4ydrEKx5pmTv_LZcuWbA164o2dX3mSAA.png',
    ],
    [
      '엘나스',
      'https://i.namu.wiki/i/aXV7iYyDeku9AExXoMZe8Vo3RLfd2aJn-BcfnOzZiSkl1o3ZDpgp2qDmg_8fHapbF9mGxzytM-7Zg8kyVsHvJQ.png',
    ],
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
