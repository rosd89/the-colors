const fetch = require("node-fetch");
const URL = "http://localhost:3000/";

describe("WebAPI", () => {
  it("GET", async () => {
    // given
    const given = require("./data.json");

    // when
    const json = await fetch(URL).then(data => data.json());

    // then
    expect(Object.keys(json).length).toEqual(Object.keys(given).length);
    expect(Array.isArray(json.products)).toBe(true);
    expect(typeof json.session).toBe("object");
    expect(typeof json.session.money).toBe("number");
    expect(typeof json.admin).toBe("object");
    expect(typeof json.admin.power).toBe("boolean");
    expect(typeof json.admin.daily).toBe("object");
    expect(typeof json.admin.product).toBe("object");
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
    expect(response).toEqual(given);
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
