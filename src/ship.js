function ShipFactory(length) {
  return {
    length: length,
    sunken: false,
    timesHit: 0,
    hit() {
      if (this.timesHit <= this.length) {
        this.timesHit += 1
        this.isSunk();
      }
    },
    isSunk() {      
      if (this.timesHit >= this.length) {
        this.sunken = true;
      };
    },
  };
}; 

module.exports = ShipFactory;
