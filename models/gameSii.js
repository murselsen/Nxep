const fs = require("fs");
const readline = require("readline");
const SaveModules = require("./saves");
const { type } = require("os");

class GameSii {
  constructor(saveGameSiiPath) {
    this.path = saveGameSiiPath;
    this.lineContainers = null;
    this.datalines = null;
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
  }
  async init() {}
  getData() {
    return {
      path: this.path,
      content: this.content,
    };
  }

  containerStartTagFilter(startSlice, endSlice) {
    return new Promise((resolve, reject) => {
      try {
        let lineContainers = [];
        let lineIndex = 0;
        let lineContainerItem = {};

        for (let line of this.datalines.slice(startSlice, endSlice)) {
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

        resolve(lineContainers);
      } catch (error) {
        console.error(
          "Game | Container Start Tag Filter Method - Error:" + error
        );
        reject(error);
      }
    });
  }
  containerEndTagFilter(container) {
    return new Promise((resolve, reject) => {
      try {
        let namelessStartSlice = container.startIndex;
        let index = namelessStartSlice;
        const endContainerTagList = [];
        this.datalines
          .slice(namelessStartSlice, this.datalines.length - 2)
          .forEach((v, i) => {
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
        resolve(endContainerTagList[0]);
      } catch (error) {
        console.error(
          "GameSii | Container End Tag Filter Method - Error: " + error
        );
        reject("GameSii | Container End Tag Filter Method - Error: " + error);
      }
    });
  }

  containerContentFilter(container) {
    return new Promise((resolve, reject) => {
      try {
        let namelessStartSlice = container.startIndex;
        let namelessEndSlice = container.endIndex;

        const containerContent = [];
        for (let lineValue of this.datalines.slice(
          namelessStartSlice,
          namelessEndSlice
        )) {
          lineValue = lineValue.replace("\r", "").split(" ");

          containerContent.push(lineValue);
        }
        resolve(containerContent);
      } catch (error) {
        reject("Game | Container Content Filter Method - Error: " + error);
      }
    });
  }

  gameLineContainersLoad() {
    return new Promise(async (resolve, reject) => {
      try {
        console.warn("Save | GameSii | Line Containers Load Method");

        let lineIndex = 0;
        let lineContainers = await this.containerStartTagFilter(
          0,
          this.datalines.length - 2
        );
        let lineContainerIndex = 0;
        lineContainers = lineContainers.filter(
          (container) => Object.keys(container).length > 0
        );

        for (let container of lineContainers) {
          // TODO : End Tag Filter
          let endTag = await this.containerEndTagFilter(container);
          container.index = lineContainerIndex++;
          container.endIndex = endTag.index;
          container.endValue = endTag.value;

          //  TODO : Content Filter
          let content = await this.containerContentFilter(container);
          container.content = content;
        }
        resolve(lineContainers);
      } catch (error) {
        console.error("Game | Game Line Containers Load - Method", error);
        reject(error);
      }
    });
  }

  gameDataLinesLoad() {
    try {
      console.warn("Save | GameSii | Data Lines Load Method");
      console.log("Path:", this.path);
      const fileStream = fs.readFileSync(this.path, "utf-8");
      const gameDetailStreamLines = fileStream.split("\n");
      return gameDetailStreamLines;
    } catch (error) {
      console.error("Game Sii | game data lines Load - Error:", error);
    }
  }

  containerContentBuild(container, classObject) {
    console.warn("Game | Content Builder -", container.namelessTag);
    console.log("Container:", container.content);
    for (let contentItem of container.content.slice(
      1,
      container.content.length
    )) {
      classObject.nameless = container.namelessValue;
      // tag
      let tag = contentItem[1].replace(":", "");
      let value = contentItem[2];
      // list item
      if (tag.includes("[")) {
        tag = tag.split("[")[0];
        // console.log("List Item:", tag, ":", value);
        if (!Array.isArray(classObject.content[`${tag}_list`])) {
          classObject.content[`${tag}_list`] = []; // Eğer değilse, yeni bir array oluştur
        }
        if (contentItem.length > 3) {
          value = `${contentItem[2]} ${contentItem[3]} ${contentItem[4]} ${contentItem[5]}`;
          classObject.content[`${tag}_list`].push(value);
        }
        classObject.content[`${tag}_list`].push(value);
      } else {
        // console.log("Item:", tag, ":", value);
        if (contentItem.length > 3) {
          value = `${contentItem[2]} ${contentItem[3]} ${contentItem[4]}`;
          classObject.content[tag] = value;
        }
        classObject.content[tag] = value;
      }
    }
    return classObject;
  }

  gameContentLoad() {
    try {
      console.log("SaveModules : ", SaveModules);
      console.warn("Game | Content Load");
      for (let container of this.lineContainers) {
        //
        let classTag = container.namelessTag
          .split("_") // Alt çizgi ile ayır
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // İlk harf büyük yap
          .join(""); // Birleştir
        console.log("Class Tag:", classTag);
        if (Array.isArray(this.content[container.namelessTag])) {
          let contentValue = this.containerContentBuild(
            container,
            new SaveModules[classTag](container.namelessValue)
          );
          this.content[container.namelessTag].push(contentValue);
        } else {
          this.content[container.namelessTag] = this.containerContentBuild(
            container,
            new SaveModules[classTag](container.namelessValue)
          );
        }
      }
    } catch (error) {
      console.error("Game | game.sii content load - Error:", error);
    }
  }
}
module.exports = GameSii;
