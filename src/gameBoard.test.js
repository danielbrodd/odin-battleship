const GameBoard = require('./gameBoard')


describe('Game Board', () => {
  beforeAll(() => {
    return gameBoard = GameBoard();
  });
  test('exists', () => {
    expect(GameBoard).toBeDefined();
  });

  test('board size is 8x8', () => {
      expect(gameBoard.maxSize).toBe(8);
      expect(gameBoard.minSize).toBe(8);
    })

  test('has missed hits', () => {
    expect(gameBoard.missed).toBeDefined();
  })

  test('has hits', () => {
    expect(gameBoard.hits).toBeDefined();
  })

  test('have ships', () => {
    expect(gameBoard.ships).toBeDefined();
  })

  test('placeShip exists', () => {
    expect(gameBoard.placeShip).toBeDefined()
  })

  test('placeShip vertical', () => {
    gameBoard.placeShip([2,3], 2, "v");
    // Expect a ship of length 2, placed vertical
    // to have coordinates [[2,3],[2,4]] and to be in ships array.
    expect(gameBoard.ships).toHaveLength(1);
    
  })

  test('placeShip vertical object', () => {
    expect([...gameBoard.ships[0].coordinates]).toEqual([...new Set(["2, 3", "2, 4"]  )])
  })
  
  test('placeShip horizontal', () => {
    gameBoard.placeShip([4,6], 1, "h");
    expect(gameBoard.ships).toHaveLength(2);
  })

  test('receiveAttack exists', () => {
    expect(gameBoard.receiveAttack).toBeDefined();
  })
  test('receiveAttack registers hit', () => {
    gameBoard.receiveAttack([2,3])
    expect(gameBoard.hits).toHaveLength(1);
  });

  test('receiveAttack sends to ship', () => {
    expect(gameBoard.ships[0].ship.timesHit).toBe(1)
  })

  test('receiveAttack registers a miss', () => {
    gameBoard.receiveAttack([6,6])
    expect(gameBoard.missed).toHaveLength(1)
    expect(gameBoard.missed[0]).toEqual([6,6])
  });

  test('isGameOver exists', () => {
    expect(gameBoard.isGameOver).toBeDefined()
  });
  
  test('isGameOver works, negative', () => {
    expect(gameBoard.isGameOver()).toBeFalsy();
  }); 
  
  test('isGameOver works, positive', () => {
    gameBoard.receiveAttack([2,4])
    gameBoard.receiveAttack([6,4])
    expect(gameBoard.isGameOver()).toBeTruthy();
  });
  });
