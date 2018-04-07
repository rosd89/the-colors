const store = require("./data.json");

function isCorrect(data) {
  if (
    typeof data !== "object" ||
    !Array.isArray(data.products) ||
    typeof data.session !== "object" ||
    typeof data.admin !== "object" ||
    Object.keys(data).length !== Object.keys(store).length ||
    (data.session && typeof data.session.money !== "number") ||
    (data.admin && typeof data.admin.power !== "boolean") ||
    (data.admin && typeof data.admin.daily !== "object") ||
    (data.admin && typeof data.admin.product !== "object")
  )
    return false;
  else return true;
}

module.exports = isCorrect;
