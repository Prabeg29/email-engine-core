import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

import config from "../config";
import logger from "../utils/logger.util";

export const msalClient = new ConfidentialClientApplication({ auth: { ...config.msal.auth } });

msalClient.acquireTokenByClientCredential({
  scopes
});

function getAuthenticatedClient(accessToken: string): Client {
  const client = Client.init({
    authProvider: async (done) => {
      done(null, accessToken);
    },
  });

  return client;
}

async function getMessages(accessToken: string) {
  try {
    const client = getAuthenticatedClient(accessToken);

    return await client
      .api('/me')
      .select('displayName,mail,mailboxSettings,userPrincipalName')
      .get();
  } catch (err) {
    logger.error(`[getMessages] => ${err}`);
  }
}

export { getMessages };
