'use client'

import { setPartyData } from '@/server/party/party'

const CreateRandomParties = () => {
  const createOne = async () => {
    const id = crypto.randomUUID()
    const recruitType = Math.random() > 0.5 ? '구인' : '구직'

    await setPartyData({
      title: '나무꾼 테스트',
      content: '나무꾸운',
      tags: {
        place: null,
        role: '나무꾼',
        method: null,
      },
      id,
      recruitType,
      author: '711955834405388319',
      authorName: 'fecapark',
      avatar: null,
      createdAt: new Date(),
      updatedAt: null,
      inProgress: true,
      positions: [],
    })
  }

  const onClick = async () => {
    await createOne()
    await createOne()
    await createOne()
    await createOne()
    await createOne()
    await createOne()
    await createOne()
    await createOne()
    await createOne()
  }

  return (
    <button
      className="fixed bottom-4 left-4 bg-black cursor-pointer p-2 "
      onClick={onClick}
      type="button"
    >
      click test
    </button>
  )
}

export default CreateRandomParties
