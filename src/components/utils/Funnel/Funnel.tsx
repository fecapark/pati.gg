'use state'

import React, { useEffect, useMemo, useState } from 'react'

import { Oval } from 'react-loader-spinner'
import { useRecoilState } from 'recoil'

import { isFunnelCanGoNextAtom } from '@/shared/atom'

interface FunnelProps {
  onResult: () => Promise<void>
  children: React.ReactNode
}

const ResultButtonContent = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return (
      <Oval width={20} height={20} color="#e0e0e0" secondaryColor="#ffffff00" strokeWidth={4} />
    )
  }

  return '확인'
}

const Funnel = ({ onResult, children }: FunnelProps) => {
  const [childSize, setChildSize] = useState(0)
  const [step, setStep] = useState(0)
  const [isResultWorking, setIsResultWorking] = useState(false)
  const [isFunnelCanGoNext, setIsFunnelCanGoNext] = useRecoilState(isFunnelCanGoNextAtom)

  const onNext = () => {
    setStep((prev) => {
      return Math.min(Math.max(prev + 1, 0), childSize - 1)
    })
    setIsFunnelCanGoNext(false)
  }

  const onPrev = () => {
    setStep((prev) => Math.min(Math.max(prev - 1, 0), childSize - 1))
  }

  const item = useMemo(() => {
    return React.Children.toArray(children)[step]
  }, [step, children])

  useEffect(() => {
    setChildSize(React.Children.count(children))
  }, [children])

  return (
    <div className="w-full">
      <div>{item}</div>
      <div className="w-full flex justify-between items-center mt-12">
        {step === 0 ? (
          <div />
        ) : (
          <button type="button" onClick={onPrev} className="text-[#a0a0a0]">
            이전
          </button>
        )}
        <button
          className={`px-6 py-2 rounded-md text-sm font-medium ${isFunnelCanGoNext && !isResultWorking ? 'bg-[#2d7ceb]' : 'bg-[#466288] text-[#a0a0a0]'}`}
          type="button"
          onClick={async () => {
            if (step === childSize - 1) {
              setIsResultWorking(true)
              await onResult()
              setIsResultWorking(false)
            } else {
              onNext()
            }
          }}
          disabled={!isFunnelCanGoNext || isResultWorking}
        >
          {step === childSize - 1 ? <ResultButtonContent isLoading={isResultWorking} /> : '다음'}
        </button>
      </div>
    </div>
  )
}

export default Funnel
