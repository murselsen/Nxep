class PoliceOffenceLog {
  constructor() {
    this.nameless = "";
    this.content = {
      detailed_history_entries: 0,
      detailed_history_entries_list: [],
      offence_total_counts: 0,
      offence_total_counts_list: [],
      offence_total_fines: 0,
      offence_total_fines_list: [],
    };
    return this;
  }
}

module.exports = PoliceOffenceLog;
