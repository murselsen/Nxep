class JobOfferData {
  constructor(parameters) {
    this.nameless = "";
    this.content = {
      target: "",
      expiration_time: 0,
      urgency: 0,
      shortest_distance_km: 0,
      ferry_time: 0,
      ferry_price: 0,
      cargo: "",
      company_truck: "",
      trailer_variant: "",
      trailer_definition: "",
      units_count: 0,
      fill_ratio: 0,
      trailer_place: 0,
    };
    return this;
  }
}
module.exports = JobOfferData;
