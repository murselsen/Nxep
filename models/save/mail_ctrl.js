class MailCtrl {
  constructor() {
    this.nameless = "";
    this.content = {
      inbox: 0,
      inbox_list: 0,
      last_id: 0,
      undread_count: 0,
      pending_mails: 0,
      pmail_timers: 0,
    };
    return this;
  }
}

module.exports = MailCtrl;
