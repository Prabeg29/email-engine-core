import { Request, Response } from "express";

import config from "../config";
import { esClient } from "../utils/elastic-search.util";
import { syncMessages } from "../jobs/sync-messages.job";
import { msalClient } from "../integrations/outlook.integration";

const scopes: string[] = ["https://graph.microsoft.com/.default"];
const redirectUri: string = config.redirectUri as string;

async function connect(_req: Request, res: Response) {
  const authUrl = await msalClient.getAuthCodeUrl({ scopes, redirectUri });

  res.status(200).json({ authUrl: authUrl });
}

async function saveUser(req: Request, res: Response) {
  const response = await msalClient.acquireTokenByCode({
    scopes,
    redirectUri,
    code: req.query.code as string,
  });

  await esClient.index({
    index: 'users',
    document: {
      homeAccountId: response.account?.homeAccountId,
      username: response.account?.username,
      localAccountId: response.account?.localAccountId,
      tokenType: response.tokenType,
      accessToken: response.accessToken,
      expiresOn: response.expiresOn,
      idToken: response.idToken
    },
  });

  await syncMessages.add(`sync-messages-for-tenant-1`, { homeAccountId: '00000000-0000-0000-0f46-aaab89adbb25.9188040d-6c67-4c5b-b112-36a304b66dad' });

  res.status(200).json({ message: 'Account linked successfully' });
}

export { connect, saveUser };
