class Player {
  constructor(parameters) {
    this.nameless = "";
    this.content = {
      hq_city: "",
      trailers: 0,
      trailer_utilization_logs: 0,
      trailer_defs: 0,
      assigned_truck: "",
      my_truck: null,
      my_truck_placement: "",
      my_truck_placement_valid: false,
      my_trailer_placement: "",
      my_slave_trailer_placements: 0,
      my_trailer_attached: false,
      my_trailer_used: false,
      assigned_trailer: "",
      my_trailer: null,
      assigned_trailer_connected: true,
      truck_placement: "",
      trailer_placement: "",
      slave_trailer_placements: 0,
      schedule_transfer_to_hq: false,
      schedule_quick_travel: false,
      flags: 0,
      gas_pump_money_debt: 0,
      current_job: "",
      current_bus_job: null,
      selected_job: null,
      driving_time: 0,
      sleeping_count: 0,
      free_roam_distance: 0,
      discovary_distance: 0,
      dismissed_drivers: 0,
      trucks: 0,
      truck_profit_logs: 0,
      drivers: 0,
      drivers_list: [],
      driver_flags: 0,
      driver_flags_list: [],
      driver_readiness_timer: 0,
      driver_readiness_timer_list: [],
      driver_undrivable_truck_timers: 0,
      driver_undrivable_truck_timers_list: [],
      driver_quit_warned: 0,
    };
    return this;
  }
}
module.exports = Player;
