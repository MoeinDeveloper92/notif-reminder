//in this section we obtain access token for the graph API

const msal = require("@azure/msal-node");
const config = require("../server/config");

const gettinAccountInfo = new msal.ConfidentialClientApplication({
  auth: {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    authority: `https://login.microsoftonline.com/${config.tenantId}`,
  },
});

const getAccessToken = async () => {
  const result = await gettinAccountInfo.acquireTokenSilent({
    scopes: config.scopes,
  });

  return result.accessToken;
};

module.exports = getAccessToken;
