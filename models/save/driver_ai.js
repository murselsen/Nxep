class DriverAi {
  constructor() {
    this.nameless = "";
    this.content = {
      adr: 1,
      long_dist: 0,
      heavy: 0,
      fragile: 1,
      urgent: 0,
      mechanical: 0,
      hometown: "",
      current_city: "",
      state: 1,
      on_duty_timer: 0,
      extra_maintenance: 0,
      driver_job: null, // job_info
      experience_points: 2455,
      training_policy: 0,
      adopted_truck: null,
      assigned_truck: null,
      assigned_truck_efficiency: 1,
      assigned_truck_axle_count: 2,
      assigned_truck_mass: 10000,
      slot_truck_efficiency: 1,
      slot_truck_axle_count: 2,
      slot_truck_mass: 10000,
      adopted_trailer: null,
      assigned_trailer: null,
      old_hometown: "",
      profit_log: null, // profit_log
      
    };
    return this;
  }
}

module.exports = DriverAi;
