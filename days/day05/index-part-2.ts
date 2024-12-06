import fs from 'fs'
const input = fs.readFileSync('days/day05/input.txt', 'utf8')
const lines = input.split('\n')
lines.pop()

const newlineIndex = lines.indexOf('')

const instructions = lines.slice(0, newlineIndex).map(l => l.split('|'))
const sequences = lines.slice(newlineIndex + 1).map(l => l.split(','))

// console.log({
//   instructions,
//   sequences
// })

const correctSequences: string[][] = []
const incorrectSequences: string[][] = []
for (const sequence of sequences) {
  let correct = true
  for (let i = 0; i < sequence.length; i++) {
    for (let y = i + 1; y < sequence.length; y++) {
      const currentPage = sequence[y]
      let stop = false
      for (const instruction of instructions) {
        if (instruction[1] === sequence[i] && instruction[0] === currentPage) {
          correct = false
          const tmp = sequence[i]
          sequence[i] = currentPage
          sequence[y] = tmp
          i = 0
          stop = true
          continue
        }
      }
      if (stop) {
        continue
      }
    }
  }
  if (correct) {
    correctSequences.push(sequence)
  } else {
    incorrectSequences.push(sequence)
  }
}

const total = incorrectSequences.reduce((acc: number, curr: string[]) => {
  const middleIndex = Math.ceil(curr.length / 2) - 1

  return acc + Number(curr[middleIndex])
}, 0)

console.log(total)
