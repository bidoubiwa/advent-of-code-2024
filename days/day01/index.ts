import * as fs from 'fs'

const input = fs.readFileSync('days/day01/input.txt', 'utf8')

const lines = input.split('\n')
const leftIds: number[] = []
const rightIds: number[] = []

lines.forEach((line) => {
  const [left, right] = line.replace(/\s+/g, ' ').split(' ').map(line => line.trim())
  leftIds.push(parseInt(left))
  rightIds.push(parseInt(right))
})

leftIds.pop()
rightIds.pop()

leftIds.sort()
rightIds.sort()

const total = leftIds.reduce<number>((acc: number, leftId: number, index: number) => {
  acc = acc + Math.abs(leftId - rightIds[index])
  return acc
}, 0)

let similarityScore = 0

for (const leftId of leftIds) {
  const occurences = rightIds.filter(rightId => leftId === rightId).length
  similarityScore = similarityScore + (occurences * leftId)
}

console.log({ similarityScore })
console.log({ total })
