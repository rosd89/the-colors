const store = require("./data.json");

function isCorrect(data) {
  if (
    typeof data !== "object" ||
    !Array.isArray(data.products) ||
    typeof data.session !== "object" ||
    typeof data.power !== "boolean" ||
    typeof data.log !== "object" ||
    Object.keys(data).length !== Object.keys(store).length ||
    (data.session && typeof data.session.select !== "string") ||
    (data.session && typeof data.session.change !== "number") ||
    typeof data.power !== "boolean" ||
    (data.log && typeof data.log.daily !== "object") ||
    (data.log && typeof data.log.products !== "object") ||
    typeof data.timer !== "number"
  ) {
    return false;
  } else return true;
}

module.exports = isCorrect;
