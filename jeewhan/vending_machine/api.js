const http = require("http");
const port = 3000;

const isCorrect = require("./isCorrect");

let store = require("./data.json");

const requestHandler = (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  let data = "";

  if (request.url === "/" && request.method === "GET")
    response.end(JSON.stringify(store));
  else if (request.url === "/" && request.method === "POST") {
    request.on("data", chunk => (data += chunk.toString()));
    request.on("end", () => {
      data = JSON.parse(data);

      if (isCorrect(data)) {
        store = data;
        response.statusCode = 200;
        response.end(JSON.stringify(true));
      } else {
        response.statusCode = 404;
        response.end(JSON.stringify(false));
      }
    });
  } else {
    response.statusCode = 404;
    response.end(JSON.stringify({}));
  }
};

http
  .createServer(requestHandler)
  .listen(
    port,
    error =>
      error
        ? console.log(`something bad happened ${error}`)
        : console.log(`server is listening on ${port}`)
  );
