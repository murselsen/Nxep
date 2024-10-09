class Dependencies {
  constructor(dependencies_fullText) {
    this.fullText = dependencies_fullText;
    this.type = "";
    this.require = false;
    this.key = "";
    this.title = "";
    this.init(dependencies_fullText);
    return this;
  }
  init(dependencies_fullText) {
    let result, resultType;
    result = dependencies_fullText.replaceAll('"', "").split("|");
    this.type = result[0].replaceAll("r", "");
    this.require = result[0].includes("r") ? false : true;
    this.key = result[1];
    this.title = result[2];
  }
}

module.exports = Dependencies;
