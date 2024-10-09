class ProfitLog {
  constructor(parameters) {
    this.nameless = "";
    this.content = {
      stats_data: 0,
      stats_data_list: [],
      acc_distance_free: 0,
      acc_distance_on_job: 0,
      history_age: 0,
    };
    return this;
  }
}
module.exports = ProfitLog;