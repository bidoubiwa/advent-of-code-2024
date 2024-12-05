import fs from 'fs'

const input = fs.readFileSync('days/day04/input.txt', 'utf8')
const lines = input.split('\n')
lines.pop()

const WORD = 'XMAS'
let total = 0
const directions: Array<[number, number]> = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
  [1, 1], // diagonal down-right
  [-1, -1], // diagonal up-left
  [1, -1], // diagonal down-left
  [-1, 1] // diagonal up-right
]

const rowLen = lines.length
const colLen = lines[0].length
for (let i = 0; i < rowLen; i++) {
  for (let y = 0; y < colLen; y++) {
    const currentChar = lines[i][y]
    if (currentChar === 'X') {
      for (const direction of directions) {
        //

        const foundWord = checkWord(lines, i, y, direction)
        if (foundWord) {
          total++
        }
      }
    }
  }
}

console.log(total)

function checkWord (
  lines: string[],
  startRow: number,
  startCol: number,
  direction: [number, number]): boolean {
  const [xdir, ydir] = direction

  for (let i = 0; i < WORD.length; i++) {
    const currentRow = startRow + i * xdir
    const currentCol = startCol + i * ydir

    if (currentRow >= lines.length || currentRow < 0 ||
      currentCol >= lines[0].length || currentCol < 0) {
      return false
    }

    if (lines[currentRow][currentCol] !== WORD[i]) {
      return false
    }
  }

  return true
}
