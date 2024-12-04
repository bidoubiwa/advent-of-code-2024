import * as fs from 'fs'

const input = fs.readFileSync('days/day03/input.txt', 'utf8')
const lines = input.split('\n')
lines.pop()

const mult = lines.join('')
  .split('do()')
  .map(l => l.split('don\'t()'))
  .map(l => l[0])
  .join('')
  .split('mul(')
  .filter(l => !isNaN(Number(l[0])) && l.includes(')'))
  .map(l => l.split(')'))
  .flat()
  .filter(l => !isNaN(Number(l[0])) && l.includes(','))
  .map(l => l.split(','))
  .filter(l => l.length === 2 && !isNaN(Number(l[0])) && !isNaN(Number(l[1])))
  .reduce((acc: number, curr: string[]) => acc + (Number(curr[0]) * Number(curr[1])), 0)

console.log(mult)
