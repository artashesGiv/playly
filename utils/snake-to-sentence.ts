export function snakeToSentence(input: string): string {
  if (!input) return ''

  const [first, ...rest] = input.split('_')

  const firstWord = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase()

  const otherWords = rest.map(word => word.toLowerCase())

  return [firstWord, ...otherWords].join(' ')
}
