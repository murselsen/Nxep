class PoliceOffenceLogEntry {
  constructor() {
    this.nameless = "";
    this.content = {
      game_time: 0,
      type: 0,
      fine: 0,
    };
    return this;
  }
}

module.exports = PoliceOffenceLogEntry;
