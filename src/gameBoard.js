const ShipFactory = require('./ship')

function GameBoard() {
  const board =  {
    maxSize: 8,
    minSize: 8,
    missed: [],
    hits: [],
    ships: [],
    placeShip(start, length, orientation) {
      const ship = ShipFactory(length);

      if (orientation !== "v" && orientation !== "h") {
        throw new Error('invalid orientation, use "v" or "h"')
      }

      if (orientation === "v") {
        let coordinates = this._placeShipHelperVertical(start,length)
        let shipObj = {ship, coordinates};
        this.ships.push(shipObj);
      }
      if (orientation === "h") {
        let coordinates = this._placeShipHelperHorizontal(start, length)
        let shipObj = {ship, coordinates};
        this.ships.push(shipObj);
      }

    },
    receiveAttack(arr){
      if (this.hits.some(hit => hit[0] === arr[0] && hit[1] === arr[1]) || 
        this.missed.some(miss => miss[0] === arr[0] && miss[1] === arr[1])) {
        return; 
      };
      let key = `${arr[0]}, ${arr[1]}`
      for (let ship of this.ships) {
        if (ship.coordinates.has(key)) {
          this.hits.push(arr);
          ship.ship.hit();
          return
        }
      };
      this.missed.push(arr);
      this.isGameOver();
    },
    isGameOver() {
      let sunkenStatus = [];
      this.ships.forEach(shipObj => {
        sunkenStatus.push(shipObj.ship.sunken)
      });
      return sunkenStatus.every(val => val === true) ? true : false;
    },
    _placeShipHelperVertical(start, length) {
      let allX = start[0];
      let res = new Set();
      let currY = start[1];
      let i = 0;
      do {
        res.add(`${allX}, ${currY}`);
        currY++;
        i++;
      } while (i < length);
      return res;
    },
    _placeShipHelperHorizontal(start,length) {
      let allY = start[0];
      let res = new Set();
      let currX = start[1];
      let i = 0;
      do {
        res.add(`${currX}, ${allY}`);
        currX++;
        i++;
      } while (i < length);
      return res;
    },
  }
  return board
};


module.exports = GameBoard;
