const express = require("express");
const http = require("http");
const moment = require("moment-timezone");
const port = process.env.PORT || 5000
const app = express();

moment.tz.setDefault("Australia/Sydney");

function lightsShouldTurnOn() {

  const now = moment();
  const lightsOnTime = moment().hour(18);
  const bedTime = moment().hour(23);  
  // If the time is between 18:00 and 23:00, turn the lights on.
  return (now.isAfter(lightsOnTime) && now.isBefore(bedTime));
}

app.post("/", (req, res) => {
  res.sendStatus(204);
});

// When my phone has joined the network, check if we should perform an action
app.post("/joined-home-network", (req, res) => {
  const options = {
    hostname: "maker.ifttt.com",
    method: "POST",
    path: "/trigger/arrived-home/with/key/" + process.env.IFTTT
  };

  if (lightsShouldTurnOn()) {
    const request = http.request(options, (response) => {
      console.log("STATUS ", response.statusCode);
      if (response.statusCode === 200) {
        console.log("Triggering lights on");
      }
      return;
    });
    request.end();
    res.sendStatus(200);
  }
});

console.log(`Current time ${moment().format()}`);
app.listen(port, () => console.log(`Listening on port ${port}...`));
