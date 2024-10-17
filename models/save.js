const path = require("path");
const fs = require("fs");
const Dependencies = require("./dependencies");
const GameSii = require("./gameSii");
const SaveModel = require("./saves");

class Save {
  constructor(dirPath) {
    this.location =
      "/profiles/local/" +
      dirPath.split("\\")[dirPath.split("\\").length - 3] +
      "/save/" +
      dirPath.split("\\").pop();
    this.path = dirPath;
    this.displayName = dirPath.split("\\").pop();
    this.gamePath = path.join(dirPath, "game.sii");
    this.infoPath = path.join(dirPath, "info.sii");
    this.infoDecrypt = false;
    this.infoText = "";
    this.info = {
      nameless: "",
      content: {
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
      },
    };
    // Todo : Game.sii File Content
    this.gameDecrypt = false;
    this.gameText = "";
    this.game = {};

    // Todo : Initialize
    this.init();
  }

  /**
   * TODO: Initialize Save class
   * */
  init = () => {
    this.infoIsDecrypt();
    this.gameIsDecrypt();
    if (this.infoDecrypt) {
      this.infoLoad();
      //this.infoTextLoad();
      //this.infoTextFileWrite();
    } else {
      this.info = {};
    }
  };

  /**
   * TODO: Returns the record file encryption status
   */
  infoIsDecrypt = () => {
    const infoStream = fs.readFileSync(this.infoPath, "utf8");
    let infoStreamLines = infoStream.split("\n");

    if (infoStreamLines[0].includes("SiiNunit")) {
      this.infoDecrypt = true;
    } else {
      this.infoDecrypt = false;
    }
  };
  gameIsDecrypt = () => {
    const gameStream = fs.readFileSync(this.gamePath, "utf8");
    let gameStreamLines = gameStream.split("\n");

    if (gameStreamLines[0].includes("SiiNunit")) {
      this.gameDecrypt = true;
    } else {
      this.gameDecrypt = false;
    }
  };

  /**
   * TODO: Method to load information for a save
   * @returns {void}
   */
  infoLoad = () => {
    try {
      const infoStream = fs.readFileSync(this.infoPath, "utf8");
      let infoStreamLines = infoStream.split("\n");

      for (let line of infoStreamLines) {
        line = line.trim().split(": ");
        if (line.length > 1) {
          let key = line[0];
          let value = line[1];

          switch (key) {
            case "name":
              this.info.content.name = value.replaceAll('"', "");
              break;
            case "time":
              this.info.content.time = value;
              break;
            case "file_time":
              this.info.content.file_time = value;
              break;
            case "version":
              this.info.content.version = value;
              break;
            case "info_version":
              this.info.content.info_version = value;
              break;
            case "dependencies":
              this.info.content.dependencies = value;
              break;
            case "info_players_experience":
              this.info.content.info_players_experience = value;
              break;
            case "info_unlocked_recruitments":
              this.info.content.info_unlocked_recruitments = value;
              break;
            case "info_unlocked_dealers":
              this.info.content.info_unlocked_dealers = value;
              break;
            case "info_visited_cities":
              this.info.content.info_visited_cities = value;
              break;
            case "info_money_account":
              this.info.content.info_money_account = value;
              break;
            case "info_explored_ratio":
              this.info.content.info_explored_ratio = value;
              break;
            default:
              break;
          }
          if (key.includes("save_container")) {
            this.info.nameless = value.split(" ").at(0).trim();
          }
          if (key.includes("dependencies[")) {
            this.info.content.dependencies_list.push(new Dependencies(value));
          }
        }
      }
    } catch (error) {
      console.error("Save | Info Load Method - Error:", error);
    }
  };

  infoTextLoad = () => {
    let text = [
      "SiiNunit",
      "{",
      `save_contianer : ${this.info.nameless} {`,
      ` name: "${this.info.content.name}"`,
      ` time: ${this.info.content.time}`,
      ` file_time: ${this.info.content.file_time}`,
      ` version: ${this.info.content.version}`,
      ` info_version: ${this.info.content.info_version}`,
      ` dependencies: ${this.info.content.dependencies}`,
    ];
    this.info.content.dependencies_list.forEach((dependenciesItem, index) => {
      text.push(` dependencies[${index}]: ${dependenciesItem.fullText}`);
    });
    text.push(
      ` info_players_experience: ${this.info.content.info_players_experience}`
    );
    text.push(
      ` info_unlocked_recruitments: ${this.info.content.info_unlocked_recruitments}`
    );
    text.push(
      ` info_unlocked_dealers: ${this.info.content.info_unlocked_dealers}`
    );
    text.push(` info_visited_cities: ${this.info.content.info_visited_cities}`);
    text.push(` info_money_account: ${this.info.content.info_money_account}`);
    text.push(` info_explored_ratio: ${this.info.content.info_explored_ratio}`);
    text.push("}");
    text.push("");
    text.push("}");
    text.push("");
    text = text.join("\r\n");
    this.infoText = text.toLocaleString();
  };
  infoTextFileWrite = () => {
    fs.writeFileSync(path.join(this.path, "info.sii"), this.infoText);
    console.log(
      `Profile: ${this.path.split("\\")[this.path.split("\\").length - 3]}
      Save : ${this.displayName}\n
      info.txt file has been written`
    );
  };
  // Todo: Save Game.sii
  gameLoad = () => {
    try {
      console.log("Save | GameSii Load Method");
      this.game = new GameSii(this.gamePath);
    } catch (error) {
      console.error("Save | GameSii Load Method - Error:", error);
    }
  };
}

module.exports = Save;
