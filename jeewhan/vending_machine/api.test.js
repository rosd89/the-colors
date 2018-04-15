const fetch = require("node-fetch");
const URL = "http://localhost:3000/";

describe("WebAPI", () => {
  it("GET", async () => {
    // given
    const given = require("./data.json");

    // when
    const json = await fetch(URL).then(data => data.json());

    // then
    expect(typeof json).toBe("object");
    expect(Object.keys(json).length).toEqual(Object.keys(given).length);
    expect(Array.isArray(json.products)).toBeTruthy();
    expect(typeof json.session).toBe("object");
    expect(typeof json.session.select).toBe("string");
    expect(typeof json.session.change).toBe("number");
    expect(typeof json.power).toBe("boolean");
    expect(typeof json.log).toBe("object");
    expect(typeof json.log.daily).toBe("object");
    expect(Array.isArray(json.log.products)).toBeTruthy();
    expect(json.log.products.length).toBe(json.products.length);
    expect(typeof json.timer).toBe("number");
  });

  it("POST", async () => {
    // given
    const given = require("./data.json");

    // when
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(given)
    }).then(data => data.json());

    // then
    expect(response).toBeTruthy();
  });

  it("Wrong Request", async () => {
    // given
    const requestURL = `${URL}/something`;

    // when
    const response = await fetch(requestURL).then(data => data.json());

    // then
    expect(response).toEqual({});
  });
});
