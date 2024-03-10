const useInvalidWordChecker = (contents: string[]) => {
  const INVALID_WORDS = ['잠쩔', '쩔', 'ㅉ']

  const check = () => {
    return contents.some((content) => {
      const preprocessedContent = content.replaceAll(' ', '').replaceAll('\n', '')
      return INVALID_WORDS.some((word) => preprocessedContent.includes(word))
    })
  }

  return check
}

export default useInvalidWordChecker
