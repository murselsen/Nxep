class ProfiltLogEntry {
  constructor(parameters) {
    this.nameless = "";
    this.content = {
      revenue: 0,
      wage: 0,
      maintenance: 0,
      fuel: 0,
      distance: 0,
      distance_on_job: 0,
      cargo_count: 0,
      cargo: "",
      source_city: "",
      source_company: "",
      destination_city: "",
      destination_company: "",
      timestamp_day: 0,
    };
    return this;
  }
}
module.exports = ProfiltLogEntry;
