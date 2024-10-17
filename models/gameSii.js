const fs = require("fs");
const readline = require("readline");
const { Economy } = require("./saves");

class GameSii {
  constructor(saveGameSiiPath) {
    this.path = saveGameSiiPath;
    this.content = {
      economy: null,
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

    this.init(this.path);
    return this;
  }
  init = (gameSiiPath) => {
    const fileStream = fs.createReadStream(gameSiiPath);
    const gameDetailStreamLines = [];
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity, // satır sonunu platformdan bağımsız olarak algılar
      encoding: "utf8",
    });
    rl.on("line", (line) => {
      // Satırı ekrana yazdırmak istersen:
      // console.log(line);
      gameDetailStreamLines.push(line);
    });
    rl.on("close", () => {
      console.log("Game Detail Stream Lines :", gameDetailStreamLines);
      console.log(
        "Game Detail Stream Line Count:",
        gameDetailStreamLines.length
      );
      console.log(
        "Game Detail Stream End Line :",
        gameDetailStreamLines[gameDetailStreamLines.length - 2]
      );
    });

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
            endContainerTagList.push({
              index: index,
              value: line[0],
            });
          }
        }
        index++;
      });

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

    ContainerStartTagFilter(
      gameDetailStreamLines,
      0,
      gameDetailStreamLines.length - 2
    );

    let lineContainerIndex = 0;
    lineContainers.forEach((container) => {
      if (Object.keys(container).length === 0) {
        // Eğer obje boşsa ({}), bir sonraki elemana geç
        return;
      }
      let endTag = ContainerEndTagFilter(gameDetailStreamLines, container);
      //console.log("Container End Tag Data:", endTag);

      container.index = lineContainerIndex++;

      container.endIndex = endTag.index;
      container.endValue = endTag.value;

      let content = ContainerContentFilter(gameDetailStreamLines, container);
      container.content = content;
      switch (container.namelessTag) {
        case "economy":
          // console.log("Economy Content:", container);

          let economyObject = new Economy(container.namelessValue);

          container.content
            .slice(1, container.content.length)
            .forEach((contentItem) => {
              if (contentItem[1].split(":")[0].includes("[")) {
                // console.log(contentItem[2])
                let tag = contentItem[1].split(":")[0].split("[")[0];
                let tagList =
                  contentItem[1].split(":")[0].split("[")[0] + "_list";
                let value = contentItem[2];
                // console.log("ListItemTag:", tag, value);
                if (!Array.isArray(economyObject.content[tagList])) {
                  economyObject.content[tagList] = [];
                }
                economyObject.content[tagList].push(value);
              } else {
                // console.log("ItemTag:", contentItem[1].split(":")[0]);
                economyObject.content[contentItem[1].split(":")[0]] =
                  contentItem[2];
              }
            });
          console.log("Economy :", economyObject);
          this.content.economy = economyObject;
          break;
        case "bank":
          console.log("Bank Content:", container);
          container.content
            .slice(1, container.content.length)
            .forEach((contentItem) => {});
          break;

        default:
          break;
      }
    });

    //console.log(this.gameData)
  };
}
module.exports = GameSii;
