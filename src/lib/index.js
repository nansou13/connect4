export function createBoard({ row, col }) {
  const matrice = []
  for (let x = 0; x < row; x++) {
    matrice[x] = []
    for (let y = 0; y < col; y++) {
      matrice[x][y] = 0
    }
  }
  return matrice
}

export function getLastPions(board, col) {
  for (let x = 0; x < board.length; x++) {
    if (board[x][col] > 0) {
      const xPos = x - 1
      return xPos >= 0 ? xPos : null
    }
  }
  return board.length - 1
}

function checkLine([a, b, c, d]) {
  return a !== 0 && a === b && a === c && a === d
}

export function checkWinner(matrice, rSelected) {
  const nbPerLine = 4
  const rowMax = matrice.length - nbPerLine
  const colMax = matrice[0].length - nbPerLine

  let row,
    col = 0

  // right
  for (row = 0; row < matrice.length; row++) {
    for (col = 0; col <= colMax; col++) {
      if (checkLine(matrice[row].slice(col, col + nbPerLine)))
        return matrice[row][col]
    }
  }

  // Check Down only if 4 from bottom
  // if (rSelected <= matrice.length - 4) {
  for (row = 0; row <= rowMax; row++) {
    for (col = 0; col < matrice[0].length; col++) {
      if (
        checkLine([
          matrice[row][col],
          matrice[row + 1][col],
          matrice[row + 2][col],
          matrice[row + 3][col],
        ])
      )
        return matrice[row][col]
    }
  }

  // down-right
  for (row = 0; row <= rowMax; row++) {
    for (col = 0; col <= colMax; col++) {
      if (
        checkLine([
          matrice[row][col],
          matrice[row + 1][col + 1],
          matrice[row + 2][col + 2],
          matrice[row + 3][col + 3],
        ])
      )
        return matrice[row][col]
    }
  }

  // down-left
  for (row = 0; row <= rowMax; row++) {
    for (col = nbPerLine - 1; col < matrice[0].length; col++) {
      if (
        checkLine([
          matrice[row][col],
          matrice[row + 1][col - 1],
          matrice[row + 2][col - 2],
          matrice[row + 3][col - 3],
        ])
      )
        return matrice[row][col]
    }
  }
  //  }

  return false
}

export function checkDraw(matrice) {
  for (let x = 0; x < matrice.length; x++) {
    for (let y = 0; y < matrice[x].length; y++) {
      if (matrice[x][y] === 0) return false
    }
  }
  return true
}

export function getMessageDialog(type, value) {
  let message = ''
  switch (type) {
    case 'finish':
      message = `${value} is the winner`
      break
    case 'draw':
      message = 'draw ! nobody wins...'
      break
    default:
  }
  return message
}

export function updateName(name) {
  const newName = prompt("player's name ?", name || null)
  return newName || name
}
