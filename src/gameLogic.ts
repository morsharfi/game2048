export interface TileType {
    // position: { x: number, y: number };
    value: number;
  }
export const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 4),
  y: Math.floor(Math.random() * 4),
});

const newNumber = (gameBoard:TileType[][]): TileType[][] => {
  let newBoard : TileType[][] = [];
  if (gameBoard.flat().reduce((count, tile) => tile.value === -1 ? count + 1 : count, 0) === 0){
    console.log("Game Over");
    
  } else {
    let firstRandPosition = getRandomPosition();
    while (gameBoard[firstRandPosition.x][firstRandPosition.y].value !== -1){
      firstRandPosition = getRandomPosition();
    }
    newBoard = gameBoard.map(row => row.map(tile => ({ ...tile })));
    newBoard[firstRandPosition.x][firstRandPosition.y].value = 2;
  }
  return newBoard;
}

const generateEmptyGameBoard = (): TileType[][] => {
  const gameBoard: TileType[][] = [];
  for (let i = 0; i < 4; i++) {
    const row: TileType[] = [];
    for (let j = 0; j < 4; j++) {
      // row.push({ position: {x:i,y:j}, value:-1});
      row.push({value:-1});

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

const merge = (line: TileType[]): TileType[] => {
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i].value === line[i + 1].value && line[i].value !== -1) {
      line[i].value *= 2;
      line[i + 1].value = -1;
    }
  }
  return line;
};

export const moveTiles = (direction: string, gameBoard:TileType[][]): TileType[][]=> {

  if (direction === 'left'){
    return newNumber(moveTilesLeft(gameBoard));
  } else if (direction === 'right'){
    return newNumber(moveTilesRight(gameBoard));

  } else if (direction === 'up'){
    return newNumber(moveTilesUp(gameBoard));
  } else
    return newNumber(moveTilesDown(gameBoard));
}

export const compress = (line: TileType[]): TileType[] => {
    const newLine = line.filter(tile => tile.value !== -1);
    while (newLine.length < line.length) {
      newLine.push({ value: -1 });
    }
    console.log("compress");
    console.log("newLine", newLine);
    
    return newLine;
  };

  const moveTilesLeft = (gameBoard: TileType[][]): TileType[][] => {
    return gameBoard.map(row => merge(compress(row)));
  }

  const moveTilesRight = (gameBoard: TileType[][]): TileType[][] => {
    return gameBoard.map(row => merge(compress(row).reverse()));
  }

  const moveTilesUp = (gameBoard: TileType[][]): TileType[][] => {
    let newBoard = gameBoard[0].map((_, colIndex) => gameBoard.map(row => row[colIndex]));
    newBoard = newBoard.map(row => merge(compress(row)));
    return newBoard[0].map((_, colIndex) => newBoard.map(row => row[colIndex])); 
}

  const moveTilesDown = (gameBoard: TileType[][]): TileType[][] => {
    let newBoard = gameBoard[0].map((_, colIndex) => gameBoard.map(row => row[colIndex]));
    newBoard = newBoard.map(row => merge(compress(row).reverse()));
    return newBoard[0].map((_, colIndex) => newBoard.map(row => row[colIndex]));
  }