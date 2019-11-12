const express = require("express");
const http = require("http");
const moment = require("moment");
const port = process.env.PORT || 5000
moment.locale("au")
const app = express();

app.post("/", (req, res) => {
  res.sendStatus(204);
});

app.post("/joined-home-network", (req, res) => {
  console.log(req);
  const options = {
    hostname: "maker.ifttt.com",
    method: "POST",
    path: "/trigger/arrived-home/with/key/" + process.env.IFTTT
  };
  const request = http.request(options, (response) => {
    console.log("STATUS ", response.statusCode);
    if (response.statusCode === 200) {
      console.log("Triggering lights on");
    }
    return;
  });
  request.end();
  res.sendStatus(200);
});

console.log(`Current time ${moment().format()}`);

app.listen(port, () => console.log(`Listening on port ${port}...`));
