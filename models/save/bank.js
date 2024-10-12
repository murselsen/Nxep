class Bank {
  constructor() {
    this.nameless = "";
    this.content = {
      money_account: 0,
      coinsurance_fixed: 0,
      coinsurance_ratio: "",
      accident_severity: "",
      loans: 0,
      app_enabled: false,
      loan_limit: 0,
      payment_timer: "",
      overdraft: false,
      overdraft_timer: 0,
      overdraft_warn_count: 0,
      sell_players_truck_later: false,
      sell_players_trailer_later: false,
    };
    return this;
  }
}

module.exports = Bank;
