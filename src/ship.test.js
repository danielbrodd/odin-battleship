const ShipFactory = require('./ship')

describe('Shipfactory', () => {
  beforeAll(() => {
    return ship = ShipFactory(2);
  })
  test('exists', () => {
    expect(ShipFactory).toBeDefined()
  });
  
  let keys = ['length','sunken', 'timesHit', 'hit', 'isSunk']

  keys.forEach(key =>{
    test(`has key ${key}`, () => {
      expect(ship).toHaveProperty(`${key}`)
    });
  })

  test('method hit', () => {
    expect(ship.timesHit).toBe(0);
    ship.hit()
    expect(ship.timesHit).toBe(1);
  })

  test('method isSunk', () => {
    expect(ship.sunken).toBe(false)
    ship.hit()
    expect(ship.sunken).toBe(true)
  })
})
