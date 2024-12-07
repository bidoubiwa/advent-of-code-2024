import fs from 'fs'

const input = fs.readFileSync('days/day06/input.txt', 'utf8')
const lines = input.split('\n').map(line => line.split(''))
lines.pop()

const walls = new Set<string>()
let totalSteps = 1
const uniqueSpots = new Set<string>()
let guardCoord: [number, number] | null = null
let guardDirection: '^' | '<' | '>' | 'v' | null = null

const directions = ['^', '>', 'v', '<']
const directionMap: Record<'^' | '<' | '>' | 'v', [number, number]> = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1]
}

for (let i = 0; i < lines.length; i++) {
  for (let y = 0; y < lines[0].length; y++) {
    if (lines[i][y] === '#') {
      walls.add(`${i},${y}`)
    }
    if (directions.includes(lines[i][y])) {
      guardCoord = [i, y]
      guardDirection = lines[i][y] as '^' | '<' | '>' | 'v'
    }
  }
}

let guardInRoom = true
let totalWall = 0

if (guardCoord === null || guardDirection === null) {
  throw new Error()
}

while (guardInRoom) {
  if (!directions.includes(guardDirection)) {
    throw new Error('Nop')
  }

  const directionPos: [number, number] = directionMap[guardDirection]
  const newX: number = guardCoord[0] + directionPos[0]
  const newY: number = guardCoord[1] + directionPos[1]

  const walkedOut = checkBoundary([newX, newY], lines)
  if (walkedOut) {
    guardInRoom = false
    break
  }

  const hitAWall = wallHit([newX, newY], walls)

  if (hitAWall) {
    totalWall++
    // rotate
    const indexOfGuardDirection = directions.findIndex(direction => direction === guardDirection)
    if (indexOfGuardDirection + 1 >= directions.length) {
      guardDirection = directions[0] as '^' | '<' | '>' | 'v'
    } else {
      guardDirection = directions[indexOfGuardDirection + 1] as '^' | '<' | '>' | 'v'
    }
  } else {
    if (!uniqueSpots.has(`${newX},${newY}`)) {
      uniqueSpots.add(`${newX},${newY}`)
      totalSteps = totalSteps + 1
    }
    lines[newX][newY] = 'X'
    guardCoord = [newX, newY]
  }
}

// 5387 + 1

console.log(totalSteps)
console.log({ totalWall, size: walls.size })

function wallHit (pos: [number, number], wallCoords: Set<string>): boolean {
  if (wallCoords.has(`${pos[0]},${pos[1]}`)) {
    return true
  }

  return false
}

function checkBoundary (pos: [number, number], lines: string[][]): boolean {
  const [x, y] = pos
  if (x < 0 || x >= lines.length) {
    return true
  }
  if (y < 0 || y >= lines[pos[0]].length) {
    return true
  }

  return false
}
