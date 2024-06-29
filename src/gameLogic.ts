export interface TileType {
  value: number;
}

export const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 4),
  y: Math.floor(Math.random() * 4),
});

export const newNumber = (gameBoard: TileType[][]): TileType[][] => {
  if (gameBoard.flat().every(tile => tile.value !== -1)) {
    console.log("Game Over");
    return gameBoard;
  }

  let firstRandPosition = getRandomPosition();
  while (gameBoard[firstRandPosition.x][firstRandPosition.y].value !== -1) {
    firstRandPosition = getRandomPosition();
  }

  const newBoard = gameBoard.map(row => row.map(tile => ({ ...tile })));
  newBoard[firstRandPosition.x][firstRandPosition.y].value = 2;
  return newBoard;
};

const generateEmptyGameBoard = (): TileType[][] => {
  const gameBoard: TileType[][] = [];
  for (let i = 0; i < 4; i++) {
    const row: TileType[] = [];
    for (let j = 0; j < 4; j++) {
      row.push({ value: -1 });
    }
    gameBoard.push(row);
  }
  return gameBoard;
};

export const initializeGameBoard = (): TileType[][] => {
  const gameBoard = generateEmptyGameBoard();
  const firstRandPosition = getRandomPosition();

  let secondRandPosition = getRandomPosition();

  while (
    secondRandPosition.x === firstRandPosition.x &&
    secondRandPosition.y === firstRandPosition.y
  ) {
    secondRandPosition = getRandomPosition();
  }

  gameBoard[firstRandPosition.x][firstRandPosition.y].value = 2;
  gameBoard[secondRandPosition.x][secondRandPosition.y].value = 2;

  return gameBoard;
};

const compress = (line: TileType[]): TileType[] => {
  const newLine = line.filter(tile => tile.value !== -1);
  while (newLine.length < line.length) {
    newLine.push({ value: -1 });
  }
  return newLine;
};

const merge = (line: TileType[]): TileType[] => {
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i].value === line[i + 1].value && line[i].value !== -1) {
      line[i].value *= 2;
      line[i + 1].value = -1;
    }
  }
  return line;
};

const moveTilesLeft = (gameBoard: TileType[][]): TileType[][] => {
  return gameBoard.map(row => compress(merge(compress(row))));
};

const moveTilesRight = (gameBoard: TileType[][]): TileType[][] => {
  return gameBoard.map(row => compress(merge(compress(row.reverse()))).reverse());
};

const moveTilesUp = (gameBoard: TileType[][]): TileType[][] => {
  const transposedBoard = gameBoard[0].map((_, colIndex) => gameBoard.map(row => row[colIndex]));
  const newBoard = transposedBoard.map(row => compress(merge(compress(row))));
  return newBoard[0].map((_, rowIndex) => newBoard.map(row => row[rowIndex]));
};

const moveTilesDown = (gameBoard: TileType[][]): TileType[][] => {
  const transposedBoard = gameBoard[0].map((_, colIndex) => gameBoard.map(row => row[colIndex]));
  const newBoard = transposedBoard.map(row => compress(merge(compress(row.reverse()))).reverse());
  return newBoard[0].map((_, rowIndex) => newBoard.map(row => row[rowIndex]));
};

export const moveTiles = (direction: string, gameBoard: TileType[][]): TileType[][] => {
  let newBoard;
  if (direction === 'left') {
    newBoard = moveTilesLeft(gameBoard);
  } else if (direction === 'right') {
    newBoard = moveTilesRight(gameBoard);
  } else if (direction === 'up') {
    newBoard = moveTilesUp(gameBoard);
  } else if (direction === 'down') {
    newBoard = moveTilesDown(gameBoard);
  } else {
    return gameBoard;
  }
  return newBoard;
};

export const checkGameOver = (gameBoard: TileType[][]): boolean => {
  if (gameBoard.flat().every(tile => tile.value !== -1)) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i < 3 && gameBoard[i][j].value === gameBoard[i + 1][j].value) return false;
        if (j < 3 && gameBoard[i][j].value === gameBoard[i][j + 1].value) return false;
      }
    }
    return true;
  }
  return false;
};

export const checkWin = (gameBoard: TileType[][]): boolean => {
  return gameBoard.flat().some(tile => tile.value === 2048);
};
