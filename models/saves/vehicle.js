class Vehicle {
  constructor() {
    this.nameless = "";
    this.content = {
      engine_wear: 0,
      transmission_wear: 0,
      cabin_wear: 0,
      engine_wear_unfixable: 0,
      transmission_wear_unfixable: 0,
      cabin_wear_unfixable: 0,
      fuel_relative: 0,
      rheostat_factor: 0,
      user_mirror_rot: 0,
      user_head_offset: "",
      user_fov: 0,
      user_wheel_up_down: 0,
      user_wheel_front_back: 0,
      user_mouse_left_right_default: 0,
      user_mouse_up_down_default: 0,
      accessories: 0,
      accessories_list: [],
      odometer: 0,
      odometer_float_part: 0,
      integrity_odometer: 0,
      integrity_odometer_float_part: 0,
      trip_fuel_l: 0,
      trip_fuel: 0,
      trip_recuperation_kwh: 0,
      trip_recuperation: 0,
      trip_distance_km: 0,
      trip_distance: 0,
      trip_time_min: 0,
      trip_time: 0,
      license_plate: "",
      chassis_wear: 0,
      chassis_wear_unfixable: 0,
      wheels_wear: 0,
      wheels_wear_list: [],
      wheels_wear_unfixable: 0,
      wheels_wear_unfixable_list: [],
    };
    return this;
  }
}

module.exports = Vehicle;
