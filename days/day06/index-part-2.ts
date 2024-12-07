import fs from 'fs'
type Direction = '^' | '<' | '>' | 'v'
const directions = ['^', '>', 'v', '<']
const directionMap: Record<Direction, [number, number]> = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1]
}

// No judgment
function main (): void {
  const input = fs.readFileSync('days/day06/input.txt', 'utf8')
  const lines = input.split('\n').map(line => line.split(''))
  lines.pop()

  const walls = new Set<string>()
  let guardCoord: [number, number] | null = null
  let guardDirection: Direction | null = null

  for (let i = 0; i < lines.length; i++) {
    for (let y = 0; y < lines[0].length; y++) {
      if (lines[i][y] === '#') {
        walls.add(`${i},${y}`)
      }
      if (directions.includes(lines[i][y])) {
        guardCoord = [i, y]
        guardDirection = lines[i][y] as Direction
      }
    }
  }

  if (guardCoord === null || guardDirection === null) {
    throw new Error()
  }
  let loopNumber = 0
  for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[0].length; y++) {
      if (lines[x][y] === '.') {
        lines[x][y] = '#'
        walls.add(`${x},${y}`)
        const loop = runPath(lines, guardCoord, guardDirection, walls)
        if (loop) {
          loopNumber++
        }
        walls.delete(`${x},${y}`)
        lines[x][y] = '.'
      }
    }
  }
  console.log({ loopNumber })
}

function runPath (newLines: string[][],
  guardCoord: [number, number],
  guardDirection: Direction,
  walls: Set<string>
): boolean {
  if (guardCoord === null || guardDirection === null) {
    throw new Error()
  }
  const uniqueSpots = new Set<string>()
  let guardInRoom = true

  while (guardInRoom) {
    if (!directions.includes(guardDirection)) {
      throw new Error('Nop')
    }

    const directionPos: [number, number] = directionMap[guardDirection]
    const newX: number = guardCoord[0] + directionPos[0]
    const newY: number = guardCoord[1] + directionPos[1]

    const walkedOut = checkBoundary([newX, newY], newLines)
    if (walkedOut) {
      guardInRoom = false
      break
    }

    const hitAWall = wallHit([newX, newY], walls)
    if (hitAWall) {
      const indexOfGuardDirection = directions.findIndex(direction => direction === guardDirection)
      if (indexOfGuardDirection + 1 >= directions.length) {
        guardDirection = directions[0] as '^' | '<' | '>' | 'v'
      } else {
        guardDirection = directions[indexOfGuardDirection + 1] as '^' | '<' | '>' | 'v'
      }
    } else {
      if (uniqueSpots.has(`${newX},${newY},${guardDirection}`)) {
        console.log('LOOOP')
        return true
      } else {
        uniqueSpots.add(`${newX},${newY},${guardDirection}`)
      }
      guardCoord = [newX, newY]
    }
  }
  return false
}

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

main()
