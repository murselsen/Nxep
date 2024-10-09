class PoliceCtrl {
  constructor() {
    this.nameless = "";
    this.content = {
      offence_timer: 0,
      offence_timer_list: [],
      offence_counter: 0,
      offence_counter_list: [],
      offence_valid: 0,
      offence_valid_list: [],
    };
    return this;
  }
}

module.exports = PoliceCtrl;
