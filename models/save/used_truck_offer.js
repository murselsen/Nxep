class UsedTruckOffer {
  constructor() {
    this.nameless = "";
    this.content = {
      lefthand_traffic: false,
      truck: null, // truck
      price: 0,
      expiration_game_time: 0,
    };
    return this;
  }
}

module.exports = UsedTruckOffer;
