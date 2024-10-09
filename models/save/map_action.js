class MapAction {
  constructor() {
    this.nameless = "";
    this.content = {
      id_params: 0,
      name: "",
      command: "",
      num_params: 0,
      num_params_list: [],
      str_params: 0,
      target_tags: 0,
      target_range: 0,
      type: "",
    };
    return this;
  }
}

module.exports = MapAction;
