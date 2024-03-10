import Link from 'next/link'
import { MdOpenInNew } from 'react-icons/md'

import IconWrapper from '@/components/utils/IconWrapper/IconWrapper'

const Report = ({ onlyReportContent = false }: { onlyReportContent?: boolean }) => {
  return (
    <div>
      {onlyReportContent ? null : (
        <>
          <p>서비스 이용과 관련하여 궁금하거나 추가를 원하는 내용을 문의해주시면 됩니다!</p>
          <br />
        </>
      )}
      <p className="font-semibold text-base mb-2">신고 시 제재 대상</p>
      <ul>
        <li>- 현거래 의도가 다분한 게시물 업로드</li>
      </ul>
      <ul>
        <li>- 잠쩔 관련 게시물 업로드</li>
      </ul>
      <ul>
        <li>- 실제 캐릭터 정보와 작성된 캐릭터 정보가 현저하게 차이가 나는 경우 (의도적일 경우)</li>
      </ul>
      <ul>
        <li>- 지속적인 파티 비매너 플레이</li>
      </ul>
      <ul>
        <li>- 서비스 운영에 악영향을 끼치는 경우</li>
      </ul>
      <br />
      <p>
        만약 그런 글 혹은 유저를 발견하셨다면, 해당 글의 url 또는 유저의 디스코드 프로필과 함께{' '}
        자세한 사유(스크린샷)를 담아 문의해주시면 처리하겠습니다. 또한 사유가 불충분하거나 지극히
        주관적이라고 판단될 경우, 제재 처리가 기각될 수 있습니다.
      </p>

      <div className="mb-2 mt-6 flex">
        <Link href="https://open.kakao.com/o/gchI6cfg" target="_blank" rel="noopener noreferrer">
          <div className="card-border card-bg px-5 py-3 gap-2 flex-center hover:card-hover">
            <span className="font-semibold">여기로 문의해주세요</span>
            <IconWrapper className="text-lg">
              <MdOpenInNew />
            </IconWrapper>
          </div>
        </Link>
      </div>

      {/* <p className="mt-4 mb-1">혹시 몰라서, 메일도 남겨놓을게요!</p>
      <Link href="mailto:mlauctionofficial@gmail.com">
        <span className="text-[#2D7CEB] hover:underline font-semibold">
          mlauctionofficial@gmail.com
        </span>
      </Link> */}
    </div>
  )
}

export default Report
