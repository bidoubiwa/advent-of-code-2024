import fs from 'fs'

const input = fs.readFileSync('days/day04/input.txt', 'utf8')
const lines = input.split('\n')
lines.pop()

let total = 0

const rowLen = lines.length
const colLen = lines[0].length
for (let i = 0; i < rowLen; i++) {
  for (let y = 0; y < colLen; y++) {
    const currentChar = lines[i][y]
    if (currentChar === 'A') {
      const foundWord = checkWord(lines, i, y)
      if (foundWord) {
        total++
      }
    }
  }
}

console.log(total)

function checkWord (
  lines: string[],
  startRow: number,
  startCol: number
): boolean {
  const upLeft: [number, number] = [startRow - 1, startCol - 1]
  const upRight: [number, number] = [startRow - 1, startCol + 1]
  const downLeft: [number, number] = [startRow + 1, startCol - 1]
  const downRight: [number, number] = [startRow + 1, startCol + 1]

  if (checkBoundary(lines, upLeft) && checkBoundary(lines, downRight) && checkBoundary(lines, upRight) && checkBoundary(lines, downLeft)) {
    const leftDiagonal = lines[upLeft[0]][upLeft[1]] + lines[downRight[0]][downRight[1]]

    const rightDiagonal = lines[upRight[0]][upRight[1]] + lines[downLeft[0]][downLeft[1]]

    if (
      rightDiagonal.split('').sort().join('') === 'MS' &&
      leftDiagonal.split('').sort().join('') === 'MS') {
      return true
    }
  }

  return false
}

function checkBoundary (lines: string[], pos: [number, number]): boolean {
  const [x, y] = pos
  if (x < 0 || x >= lines.length || y < 0 || y >= lines[0].length) {
    return false
  }

  return true
}
