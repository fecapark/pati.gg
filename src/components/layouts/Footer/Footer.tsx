'use client'

import useModal from '@/hooks/useModal'

import Report from '../Modal/contents/Report'

const FooterButton = ({
  alerting = false,
  onClick = () => {},
  children,
}: {
  alerting?: boolean
  onClick?: () => void
  children: React.ReactNode
}) => {
  return (
    <div
      onClick={() => {
        onClick()
      }}
      className="relative font-medium text-base text-center hover:underline cursor-pointer"
    >
      {alerting ? (
        <div className="absolute top-[-1px] left-[calc(100%+1px)] w-[6px] h-[6px] rounded-[50%] bg-red-600" />
      ) : null}
      {children}
    </div>
  )
}

const Footer = () => {
  const setReportModal = useModal({
    title: '문의하기 및 신고하기',
    content: <Report />,
  })

  return (
    <footer className="py-16 px-4 w-full bg-[#28282a] mt-[120px] flex-center flex-col text-[#d2d2d4]">
      <div className="flex-center gap-8 mb-6">
        <FooterButton onClick={() => setReportModal(true)}>문의하기 및 신고하기</FooterButton>
      </div>

      <div className="flex-center gap-1 flex-col text-sm">
        <span>{new Date().getFullYear()} &copy; pati.gg. All rights reserved.</span>
        <span className="text-center" />
      </div>
    </footer>
  )
}

export default Footer
