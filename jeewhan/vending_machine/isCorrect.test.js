const isCorrect = require("./isCorrect");

describe("isCorrect", () => {
  it("Correct", async () => {
    // given
    const given = require("./data.json");

    // when
    const result = isCorrect(given);

    // then
    expect(result).toBeTruthy();
  });

  it("Incorrect", async () => {
    // given
    const given = {};

    // when
    const result = isCorrect(given);

    // then
    expect(result).toBeFalsy();
  });
});
