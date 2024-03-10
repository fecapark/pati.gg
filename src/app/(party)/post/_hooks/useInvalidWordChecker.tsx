const useInvalidWordChecker = (contents: string[]) => {
  const INVALID_WORDS = ['잠쩔', '쩔', 'ㅉ', 'ㅁㅌ', 'ㅁㅅ', '맑은물', '눈물', '물통']

  const check = () => {
    return contents.some((content) => {
      const preprocessedContent = content.replaceAll(' ', '').replaceAll('\n', '')
      return INVALID_WORDS.some((word) => preprocessedContent.includes(word))
    })
  }

  return check
}

export default useInvalidWordChecker
