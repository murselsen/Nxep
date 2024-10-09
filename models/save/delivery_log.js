class DeliveryLog {
  constructor() {
    this.nameless = "";
    this.content = {
      version: 0,
      entries: 0,
      entries_list: [],
      cached_jobs_count: 0,
    };
    return this;
  }
}

module.exports = DeliveryLog;
