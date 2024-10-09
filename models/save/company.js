class Company {
  constructor(parameters) {
    this.nameless = "";
    this.content = {
      permanent_data: "",
      delivered_trailer: null,
      delivered_pos: 0,
      job_offer: 0,
      job_offer_list: [],
      cargo_offer_seeds: 0,
      cargo_offer_seeds_list: [],
      discovered: true,
      reserved_trailer_slot: null,
      state: 0,
    };
    return this;
  }
}

module.exports = Company;
