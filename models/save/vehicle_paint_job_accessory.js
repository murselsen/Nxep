class VehiclePaintJobAccessory {
  constructor() {
    this.nameless = "";
    this.content = {
      mask_r_color: "",
      mask_g_color: "",
      mask_b_color: "",
      flake_color: "",
      flip_color: "",
      base_color: "",
      data_path: "", //"/def/vehicle/truck/man.tgx/paint_job/color0.sii"
      refund: 0,
    };
    return this;
  }
}

module.exports = VehiclePaintJobAccessory;
