class VehicleAddonAccessory {
  constructor() {
    this.nameless = "";
    this.content = {
      slot_name: 0,
      slot_name_list: [],
      slot_hookup: 0,
      slot_hookup_list: [],
      data_path: "",
      refund: 0,
    };
    return this;
  }
}

module.exports = VehicleAddonAccessory;
