class GameProgress {
  constructor() {
    this.nameless = "";
    this.content = {
      generic_transports: "",
      undamaged_transports: "",
      clean_transports: "",
      owned_trucks: 0,
    };
    return this;
  }
}

module.exports = GameProgress;
