//3-we retriev data from the microsoft event

const getAccessToken = require("./authentication");
const config = require("./config");

const getEvents = async () => {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/sites/root/lists('${
      config.eventCatalogListId
    }')/items?$select=Title,EventDate,EndDate&$filter=EndDate ge '${new Date().toISOString()}'`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return data.value.map((item) => ({
    id: item.id,
    type: "event",
    timestamp: Date.parse(item.EventDate),
    payload: {
      title: item.Title,
      start: item.EventDate,
      end: item.EndDate,
    },
  }));
};

module.exports = getEvents;
