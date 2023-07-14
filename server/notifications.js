//4-here we generate and deliver notifcation

const getAccessToken = require("../server/authentication");
const config = require("../server/config");

const sendNotification = async (payload) => {
  const accessToken = await getAccessToken();

  const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject: "Weekly Event Reminder",
        body: {
          contentType: "Text",
          content: `Here are the events for the upcoming week:\n\n${payload
            .map(
              (event) =>
                `- ${event.payload.title} (${event.payload.start} - ${event.payload.end})`
            )
            .join("\n")}`,
        },
        toRecipients: [
          {
            emailAddress: {
              address: "moeinsamani1992@gmail.com",
            },
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    //we can use try catch :)
    throw new Error(`Failed to send notification: ${response.statusText}`);
  }
};

module.exports = sendNotification;
