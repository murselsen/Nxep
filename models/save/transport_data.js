class TransportData {
  constructor() {
    this.nameless = "";
    this.content = {
      distance: 0,
      time: 0,
      money: 0,
      count_per_adr: 0,
      count_per_adr_list: [],
      docks: 0,
      docks_list: [],
      count_per_dock: 0,
      count_per_dock_list: [],
    };
    return this;
  }
}

module.exports = TransportData;
