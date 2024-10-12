class Registry {
  constructor() {
    this.nameless = "";
    this.content = {
      data: 0,
      data_list: [],
      valid: 0,
      valid_list: [],
      keys: 0,
      keys_list: [],
      index: 0,
      index_list: [],
    };
    return this;
  }
}

module.exports = Registry;
