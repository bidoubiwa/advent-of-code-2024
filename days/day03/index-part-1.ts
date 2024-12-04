import * as fs from 'fs'

const input = fs.readFileSync('days/day03/input.txt', 'utf8')
const lines = input.split('\n')
lines.pop()

const mult = lines.join('')
  .split('mul(')
  .filter(l => !isNaN(Number(l[0])) && l.includes(')'))
  .map(l => l.split(')'))
  .flat()
  .filter(l => !isNaN(Number(l[0])) && l.includes(','))
  .map(l => l.split(','))
  .filter(l => l.length === 2 && !isNaN(Number(l[0])) && !isNaN(Number(l[1])))
  .reduce((acc: number, curr: string[]) => acc + (Number(curr[0]) * Number(curr[1])), 0)

console.log(mult)

// REGEX
let total = 0
const mainRegex = /(mul\([0-9]+,[0-9]+\)){1}/gm
const secondaryRegex = /\(([0-9]*),([0-9]*)\)/gm

const tuples = []
for (const match of lines.join('').matchAll(mainRegex)) {
  for (const subMatch of match[0].matchAll(secondaryRegex)) {
    tuples.push([subMatch[1], subMatch[2]])
    total = total + (parseInt(subMatch[1]) * parseInt(subMatch[2]))
  }
}

console.log(total)
