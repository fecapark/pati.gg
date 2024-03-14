import { SearchTagCollection, TagCollection } from '@/types/tag'

const jobOptions = [
  {
    value: 0,
    label: '초보자',
  },
  {
    value: 1,
    label: '전사 (1차)',
  },
  {
    value: 2,
    label: '파이터',
  },
  {
    value: 3,
    label: '페이지',
  },
  {
    value: 4,
    label: '스피어맨',
  },
  {
    value: 5,
    label: '마법사 (1차)',
  },
  {
    value: 6,
    label: '위자드(불,독)',
  },
  {
    value: 7,
    label: '위자드(썬,콜)',
  },
  {
    value: 8,
    label: '클레릭',
  },
  {
    value: 9,
    label: '궁수 (1차)',
  },
  {
    value: 10,
    label: '헌터',
  },
  {
    value: 11,
    label: '사수',
  },
  {
    value: 12,
    label: '도적 (1차)',
  },
  {
    value: 13,
    label: '어쌔신',
  },
  {
    value: 14,
    label: '시프',
  },
]

const tags: TagCollection = {
  places: [
    {
      name: '슬라임굴',
      section: '사냥터',
      keywords: ['슬라임굴'],
      location: '엘리니아',
      color: '#2B4D38',
    },
    {
      name: '추락주의',
      section: '사냥터',
      keywords: ['추락주의'],
      location: '커닝시티',
      color: '#3F2C58',
    },
    {
      name: '4구역',
      section: '사냥터',
      keywords: [
        '4구역',
        '1호선',
        '1호선4구역',
        '커닝1호선',
        '커닝1호선4구역',
        '커닝4구역',
        '커닝시티1호선4구역',
        '커닝시티1호선',
        '커닝시티4구역',
      ],
      location: '커닝시티',
      color: '#3F2C58',
    },
    {
      name: '개미굴',
      section: '사냥터',
      keywords: ['갬굴', '개미굴'],
      location: '슬리피우드',
      color: '#533528',
    },
    {
      name: '다크골렘',
      section: '사냥터',
      keywords: ['닼골팟', '닼골', '슬리피던전', '다크골렘'],
      location: '슬리피우드',
      color: '#533528',
    },
    {
      name: '와보땅',
      section: '사냥터',
      keywords: ['와보땅', '와일드보어의땅', '와일드보어땅', '와보팟'],
      location: '페리온',
      color: '#7A592A',
    },
    {
      name: '불타버린땅1',
      section: '사냥터',
      keywords: ['불타버린땅', '불땅', '파보땅', '파이어보어의땅', '파이어보어땅'],
      location: '페리온',
      color: '#7A592A',
    },
    {
      name: '불타버린땅2',
      section: '사냥터',
      keywords: ['불타버린땅', '불땅', '파보땅', '파이어보어의땅', '파이어보어땅'],
      location: '페리온',
      color: '#7A592A',
    },
    {
      name: '동바산',
      section: '사냥터',
      keywords: ['동쪽바위산', '동바산'],
      location: '페리온',
      color: '#7A592A',
    },
    {
      name: '커즈굴',
      section: '사냥터',
      keywords: ['커즈팟', '커즈아이의굴', '북쪽숲나무던전'],
      location: '엘리니아',
      color: '#2B4D38',
    },
    {
      name: '남던',
      section: '사냥터',
      keywords: ['남던', '원숲', '원숭이의숲나무던전'],
      location: '엘리니아',
      color: '#2B4D38',
    },
    {
      name: '콜팟',
      section: '사냥터',
      keywords: ['콜팟', '또다른길', '콜드팟'],
      location: '슬리피우드',
      color: '#283D5F',
    },
    {
      name: '위골',
      section: '사냥터',
      keywords: ['위골', '위골팟', '위험한골짜기'],
      location: '슬리피우드',
      color: '#283D5F',
    },
    {
      name: '요람',
      section: '사냥터',
      keywords: ['차가운요람', '요람'],
      location: '슬리피우드',
      color: '#283D5F',
    },
    {
      name: '신전의입구',
      section: '사냥터',
      keywords: ['신전의입구', '신전의입구'],
      location: '슬리피우드',
      color: '#283D5F',
    },

    {
      name: '따모',
      section: '사냥터',
      keywords: ['따모', '따모팟', '따뜻한모래밭', '따듯한모래밭', '모래밭'],
      location: '플로리나비치',
      color: '#8A865B',
    },
    {
      name: '붉은정원',
      section: '사냥터',
      keywords: ['붉은빛의정원', '붉정', '정원', '붉은정원'],
      location: '오르비스',
      color: '#5B2E42',
    },
    {
      name: '푸른정원',
      section: '사냥터',
      keywords: ['푸른빛의정원', '푸정', '정원', '푸른정원'],
      location: '오르비스',
      color: '#5B2E42',
    },
    {
      name: '구름공원3',
      section: '사냥터',
      keywords: ['구름공원', '구공', '903', '구름공원3', '구공삼', '구공3', '구공팟'],
      location: '오르비스',
      color: '#5B2E42',
    },
    {
      name: '구름공원4',
      section: '사냥터',
      keywords: ['구름공원', '구공', '904', '구름공원4', '구공사', '구공4', '구공팟'],
      location: '오르비스',
      color: '#5B2E42',
    },
    {
      name: '구름공원6',
      section: '사냥터',
      keywords: ['구름공원', '구공', '906', '구름공원6', '구공육', '구공륙', '구공6', '구공팟'],
      location: '오르비스',
      color: '#5B2E42',
    },
    {
      name: '산책로',
      section: '사냥터',
      keywords: ['산책로', '스카이로드'],
      location: '오르비스',
      color: '#5B2E42',
    },
    {
      name: '얼골',
      section: '사냥터',
      keywords: ['얼음골짜기', '얼골', '얼골팟'],
      location: '엘나스',
      color: '#505050',
    },
    {
      name: '늑영',
      section: '사냥터',
      keywords: ['늑영', '늑대의영역', '웨어울프', '라이칸스로프'],
      location: '엘나스',
      color: '#505050',
    },
    {
      name: '차벌',
      section: '사냥터',
      keywords: ['차벌', '차디찬벌판', '차가운벌판', '헥터', '헥터팟'],
      location: '엘나스',
      color: '#505050',
    },
    {
      name: '죽숲',
      section: '사냥터',
      keywords: ['죽숲', '죽은나무의숲'],
      location: '엘나스',
      color: '#505050',
    },
    {
      name: '기타',
      section: '사냥터',
      keywords: ['기타'],
      location: '기타',
      color: '#303030',
    },
  ],
  role: [
    {
      name: '나무꾼',
      section: '역할',
      keywords: ['나무꾼'],
      color: '#7A592A',
    },
    {
      name: '설거지',
      section: '역할',
      keywords: ['설거지'],
      color: '#2C605B',
    },
  ],
  methods: [
    {
      name: '섭뚫',
      section: '운용방식',
      keywords: ['섭뚫', '서버뚫기'],
      color: '#262558',
    },
    {
      name: '닫섭',
      section: '운용방식',
      keywords: ['닫섭', '닫힌서버'],
      color: '#642B3D',
    },
    {
      name: '환채',
      section: '운용방식',
      keywords: ['환채', '환승', '환승채널'],
      color: '#283D5F',
    },
  ],
  partyquests: [
    {
      name: '첫번째동행',
      section: '파티퀘스트',
      keywords: [
        '커파',
        '커닝파퀘',
        '첫번째동행',
        '커닝시티파퀘',
        '킹슬라임',
        '커닝파티퀘스트',
        '커닝시티파티퀘스트',
      ],
      color: '#2B4D38',
    },
  ],
}

const searchTags: SearchTagCollection = {
  recruit: [
    {
      name: '구인',
      section: '구인구직',
      keywords: ['구인'],
      color: '#2B4D38',
    },
    {
      name: '구직',
      section: '구인구직',
      keywords: ['구직'],
      color: '#2B4D38',
    },
  ],
}

export { jobOptions, tags, searchTags }
