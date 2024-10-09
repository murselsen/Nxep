class JobInfo {
  constructor() {
    this.nameless = "";
    this.content = {
      cargo: null,
      source_company: null,
      target_company: null,
      cargo_model_index: 0,
      is_articulated: false,
      is_cargo_market_job: false,
      start_time: 0,
      planned_distance_km: 0,
      ferry_time: 0,
      ferry_price: 0,
      urgency: null,
      special: null,
      units_count: 0,
      fill_ratio: 1,
    };
    return this;
  }
}

module.exports = JobInfo;
