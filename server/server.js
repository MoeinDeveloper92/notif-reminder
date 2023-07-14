const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const getEvents = require("../server/events");
const sendNotification = require("../server/notifications");
const config = require("../server/config");

const app = express();

app.use(bodyParser.json());

app.get("/events", async (req, res) => {
  const events = await getEvents();
  res.json(events);
});

cron.schedule(
  config.notificationSchedule,
  async () => {
    const events = await getEvents();

    if (events.length > 0) {
      try {
        await sendNotification(config.notificationPayload);

        console.log("Weekly reminder notification sent");
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("No events found for the upcoming week");
    }
  },
  {
    timezone: config.timeZone,
  }
);

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
