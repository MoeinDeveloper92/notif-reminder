module.exports = {
  clientId: "03eb0fb3-c01a-4f15-855a-9fe2fd439dc5",
  clientSecret: "fw78Q~yL6bt3ZjIlKle_JHHkcjCup_.jK.RmOcgi",
  tenantId: "ff28a236-881c-4b29-9b77-71405b66aca2",
  scopes: ["https://graph.microsoft.com/.default"],
  timeZone: "Europe/Berlin",
  //   bellow means every monday at 9
  notificationSchedule: "0 0 9 * * 1",
  notificationPayload: {
    type: "weekly-reminder",
    payload: {},
  },
};
