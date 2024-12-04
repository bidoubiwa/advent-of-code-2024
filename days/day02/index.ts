import * as fs from 'fs'

const input = fs.readFileSync('days/day02/input.txt', 'utf8')

const lines = input.split('\n')
const reports: number[][] = []

lines.forEach((line) => {
  const levels = line.split(' ').map(line => parseInt(line))

  reports.push(levels)
})

reports.pop()

let validLevels = 0
for (const report of reports) {
  let validLevel = validateLevel(report)
  if (!validLevel) {
    for (let i = 0; i < report.length; i++) {
      const copyReport = [...report]
      copyReport.splice(i, 1) // no judgement
      validLevel = validateLevel(copyReport)
      if (validLevel) {
        break
      }
    }
  }
  validLevels = validLevel ? validLevels + 1 : validLevels
}

function validateLevel (report: number[]): boolean {
  let order

  for (let i = 0; i <= report.length - 2; i++) {
    const diff = report[i] - report[i + 1]

    if (order === undefined && diff !== 0) {
      order = diff > 0 ? 'desc' : 'asc'
    }

    if (order === 'desc' && diff > 0 && diff >= 1 && diff <= 3) {
      continue
    }

    if (order === 'asc' && diff < 0 && diff <= -1 && diff >= -3) {
      continue
    }

    return false
  }

  return true
}

console.log({ validLevels })
