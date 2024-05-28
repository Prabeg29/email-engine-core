import { Request, Response } from "express";

import config from "../config";
import { esClient } from "../utils/elastic-search.util";
import { msalClient } from "../integrations/outlook.integration";

const scopes: string[] = config.msal.scopes?.split(',');
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

  res.status(200).json({ message: 'Account linked successfully' });
}

export { connect, saveUser };
