const path = require("path");
const fs = require("fs");
const Dependencies = require("./dependencies");
const SaveModel = require("./saves");

class Save {
    constructor(dirPath) {
        this.path = dirPath;
        this.displayName = dirPath.split("\\").pop();
        this.game = path.join(dirPath, "game.sii");
        this.info = path.join(dirPath, "info.sii");
        this.saveDetail = {
            save_container_nameless: "",
            name: "",
            time: "",
            file_time: "",
            version: "",
            info_version: "",
            dependencies: "",
            dependencies_list: [],
            info_players_experience: "",
            info_unlocked_recruitments: "",
            info_unlocked_dealers: "",
            info_visited_cities: "",
            info_money_account: "",
            info_explored_ratio: "",
        };
        this.gameData = {
            economy: {
                nameless: "",
                bank: "",
                player: "",
                companies: "",
                companies_list: [],
                garages: "",
                garages_list: [],
                garage_ignore_list: "",
                game_progress: "",
                event_queue: "",
                mail_ctrl: "",
                oversize_offer_ctrl: "",
                game_time: "",
                game_time_secs: "",
                game_time_initial: "",
                achievements_added: "",
                new_game: false,
                total_distance: "",
                experience_points: "",
                adr: "",
                long_dist: "",
                heavy: "",
                fragile: "",
                urgent: "",
                mechanical: "",
                user_colors: "",
                delivery_log: "",
                ferry_log: "",
                police_offence_log: "",
                stored_camera_mode: "",
                stored_actor_state: "",
                stored_high_beam_style: 0,
                stored_actor_windows_state: "",
                stored_actor_wiper_mode: 0,
                stored_actor_retarder: 0,
                stored_display_mode_on_dashboard: 0,
                stored_display_mode_on_gps: 0,
                stored_dashboard_map_mode: 0,
                stored_world_map_zoom: 0,
                stored_online_job_id: 0,
                stored_online_gps_behind: 0,
                stored_online_gps_ahead: 0,
                stored_online_gps_behind_waypoints: 0,
                stored_online_gps_ahead_waypoints: 0,
                stored_online_gps_avoid_waypoints: 0,
                stored_special_job: null,
                police_ctrl: "",
                stored_map_state: 0,
                stored_gas_pump_money: 0,
                stored_weather_change_timer: "",
                stored_current_weather: 0,
                stored_rain_wetness: 0,
                time_zone: 0,
                time_zone_name: "",
                last_ferry_position: "",
                stored_show_weigh: false,
                stored_need_to_weigh: false,
                stored_nav_start_pos: "",
                stored_nav_end_pos: "",
                stored_gps_behind: 0,
                stored_gps_ahead: 0,
                stored_gps_behind_waypoints: 0,
                stored_gps_ahead_waypoints: 0,
                stored_gps_avoid_waypoints: 0,
                stored_start_tollgate_pos: "",
                stored_tutorial_state: 0,
                stored_map_actions: 0,
                stored_map_actions_list: [],
                clean_distance_counter: 0,
                clean_distance_max: 0,
                no_cargo_damage_distance_counter: 0,
                no_cargo_damage_distance_max: 0,
                no_violation_distance_counter: 0,
                no_violation_distance_max: 0,
                total_real_time: 0,
                real_time_seconds: "",
                visited_cities: 0,
                visited_cities_list: [],
                visited_cities_count: 0,
                visited_cities_count_list: [],
                last_visited_city: "",
                discovered_cutscene_items: 0,
                discovered_cutscene_items_states: 0,
                unlocked_dealers: 0,
                unlocked_dealers_list: [],
                unlocked_recruitments: 0,
                unlocked_recruitments_list: [],
                total_screeshot_count: 0,
                undamaged_cargo_row: 0,
                service_visit_count: 0,
                last_service_pos: "",
                gas_station_visit_count: 0,
                last_gas_station_pos: "",
                emergency_call_count: 0,
                ai_crash_count: 0,
                truck_color_change_count: 0,
                red_light_fine_count: 0,
                cancelled_job_count: 0,
                total_fuel_litres: 0,
                total_fuel_price: 0,
                transported_cargo_types: 0,
                transported_cargo_types_list: [],
                achieved_feats: 0,
                discovered_roads: 0,
                discovered_items: 0,
                discovered_items_list: [],
                drivers_offer: 0,
                drivers_offer_list: [],
                used_vehicle_assortment: "",
                freelance_truck_offer: null,
                trucks_bought_online: 0,
                special_cargo_timer: 0,
                screen_access_list: 0,
                screen_access_list_list: [],
                screen_visit_list: 0,
                driver_pool: 0,
                driver_pool_list: [],
                registry: "",
                company_jobs_invitation_sent: false,
                company_check_hash: 0,
                relations: 0,
                relations_list: [],
                bus_stops: 0,
                bus_stops_list: [],
                bus_job_log: "",
                bus_experience_points: 0,
                bus_total_distance: 0,
                bus_finished_job_count: 0,
                bus_cancelled_job_count: 0,
                bus_total_passengers: 0,
                bus_total_stops: 0,
                bus_game_time: 0,
                bus_playing_time: 0,
            },
            bank: null,
            player: null,
            driver_player: null,
            profit_log: [], // default : 570..
            profit_log_entry: [], // default : 2...
            company: [],
            job_offer_data: [],
            garage: [],
            game_progress: null,
            transport_data: [],
            economy_event_queue: 1,
            economy_event: [],
            mail_ctrl: null,
            mail_def: [],
            oversize_offer_ctrl: null,
            oversize_route_offers: [],
            oversize_offer: [],
            //
            delivery_log: null,
            delivery_log_entry: [],
            police_offence_log: null,
            police_offence_log_entry: [],
            police_ctrl: null,
            map_action: [],
            driver_ai: [],
            job_info: [],
            used_vehicle_assortment: null,
            used_truck_offer: [],
            vehicle: [],
            vehicle_accessory: [],
            vehicle_paint_job_accessory: [],
            vehicle_wheel_accessory: [],
            vehicle_addon_accessory: [],

            ///
            registry: null,
            bus_stop: [],
            bus_job_log: [],
        };
        this.init();
        return this;
    }

    init() {
        try {
            this.saveDetailLoad();
        } catch (error) {
            console.error(error);
        }
    }
    saveDetailLoad() {
        const saveDetailStream = fs.readFileSync(this.info, "utf8");
        let saveDetailStreamLines = saveDetailStream.split("\n");

        for (let line of saveDetailStreamLines) {
            line = line.trim().split(": ");
            if (line.length > 1) {
                let key = line[0];
                let value = line[1];

                switch (key) {
                    case "name":
                        this.saveDetail.name = value;
                        break;
                    case "time":
                        this.saveDetail.time = value;
                        break;
                    case "file_time":
                        this.saveDetail.file_time = value;
                        break;
                    case "version":
                        this.saveDetail.version = value;
                        break;
                    case "info_version":
                        this.saveDetail.info_version = value;
                        break;
                    case "dependencies":
                        this.saveDetail.dependencies = value;
                        break;
                    case "info_players_experience":
                        this.saveDetail.info_players_experience = value;
                        break;
                    case "info_unlocked_recruitments":
                        this.saveDetail.info_unlocked_recruitments = value;
                        break;
                    case "info_unlocked_dealers":
                        this.saveDetail.info_unlocked_dealers = value;
                        break;
                    case "info_visited_cities":
                        this.saveDetail.info_visited_cities = value;
                        break;
                    case "info_money_account":
                        this.saveDetail.info_money_account = value;
                        break;
                    case "info_explored_ratio":
                        this.saveDetail.info_explored_ratio = value;
                        break;
                    default:
                        break;
                }
                if (key.includes("dependencies[")) {
                    this.saveDetail.dependencies_list.push(
                        new Dependencies(value)
                    );
                }
            }
        }
    }
    gameDetailLoad() {
        const gameDetailStream = fs.readFileSync(this.game, "utf8");
        const gameDetailStreamLines = gameDetailStream.split("\n");
        console.log("Game Detail Stream Line Count:", gameDetailStreamLines.length);
        console.log("Game Detail Stream End Line :", gameDetailStreamLines[gameDetailStreamLines.length - 2]);
        let lineIndex = 0;
        let lineContainers = [];

        const ContainerStartTagFilter = (lines, startSlice, endSlice) => {
            let lineIndex = 0;
            let lineContainerItem = {};
            // console.log("ContainerStartTagFilter Method");

            for (let line of lines.slice(startSlice, endSlice)) {
                line = line.replace("\r", "");
                line = line.split(" ");
                if (line.length > 3 && line[3].includes("{")) {
                    lineContainerItem.startIndex = lineIndex;
                    lineContainerItem.startValue = line;
                    lineContainerItem.namelessTag = line[0];
                    lineContainerItem.namelessValue = line[2];
                }

                lineContainers.push(lineContainerItem);
                lineContainerItem = {};
                lineIndex++;
            }
        };

        const ContainerEndTagFilter = (lines, container) => {
            // console.log("ContainerEndTagFilter Method");

            let namelessStartSlice = container.startIndex;
            let index = namelessStartSlice;
            const endContainerTagList = [];
            lines.slice(namelessStartSlice, lines.length - 2).forEach((v, i) => {
                let line = v.replace("\r", "").split(" ");
                if (line.length < 2) {
                    if (line.includes("}")) {
                        endContainerTagList.push(
                            {
                                index: index,
                                value: line[0],
                            }
                        );
                    }
                }
                index++;
            })

            return endContainerTagList[0];
        };

        const ContainerContentFilter = (gameDetailStreamLines, container) => {
            // console.log("Container:", container);
            let namelessStartSlice = container.startIndex;
            let namelessEndSlice = container.endIndex;


            const containerContent = [];
            for (let lineValue of gameDetailStreamLines.slice(
                namelessStartSlice,
                namelessEndSlice
            )) {
                lineValue = lineValue.replace("\r", "").split(" ");

                containerContent.push(lineValue);



            }
            return containerContent;
        };

        ContainerStartTagFilter(gameDetailStreamLines, 0, gameDetailStreamLines.length - 2);

        let lineContainerIndex = 0;
        lineContainers.forEach((container) => {
            if (Object.keys(container).length === 0) {
                // Eğer obje boşsa ({}), bir sonraki elemana geç
                return;
            }
            let endTag = ContainerEndTagFilter(
                gameDetailStreamLines,
                container
            );
            //console.log("Container End Tag Data:", endTag);

            container.index = lineContainerIndex++;

            container.endIndex = endTag.index;
            container.endValue = endTag.value;

            let content = ContainerContentFilter(
                gameDetailStreamLines,
                container
            );
            container.content = content;

            switch (container.startValueTag) {
                case "economy":
                    this.gameData.economy.nameless = container.namelessValue;
                    container.content.slice(1, container.content.length).forEach(contentItem => {
                        if (contentItem[1].split(":")[0].includes("[")) {
                            // console.log(contentItem[2])
                            let tag = contentItem[1].split(":")[0].split("[")[0];
                            let tagList = contentItem[1].split(":")[0].split("[")[0] + "_list";
                            let value = contentItem[2];

                            if (!Array.isArray(this.gameData.economy[tagList])) {
                                this.gameData.economy[tagList] = [];
                            }
                            this.gameData.economy[tagList].push(value);
                        } else {
                            this.gameData.economy[contentItem[1].split(":")[0]] = contentItem[2];

                        }
                    })
                    break;
                case "bank":
                    console.log("Bank Content:", container)
                    container.content.slice(1, container.content.length).forEach(contentItem => {
                    })
                    break;
                case "":
                    break;
                default:
                    break;
            }


        });

        //console.log(this.gameData)
    }
}

module.exports = Save;
