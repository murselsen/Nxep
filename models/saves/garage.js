class Garage {
  constructor(parameters) {
    this.nameless = "";
    this.content = {
      vehicles: 0,
      drivers: 0,
      trailers: 0,
      status: 0,
      profit_log: "",
      productivity: 0,
    };
    return this;
  }
}

module.exports = Garage;
