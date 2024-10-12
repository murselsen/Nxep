class MailDef {
  constructor() {
    this.nameless = "";
    this.content = {
      id: 0,
      mail_text_ref: "",
      param_keys: 0,
      param_keys_list: [],
      param_values: 0,
      param_values_list: [],
      read: false,
      accepted: false,
      expired: false,
      custom_data: 0,
    };
    return this;
  }
}

module.exports = MailDef;
