import path from 'path';

import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env')});

export default {
  app: {
    port    : process.env.APP_PORT || 3000,
    url     : process.env.APP_URL || 'http://localhost:3000',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
  redirectUri: process.env.REDIRECT_URI,
  msal: {
    auth: {
      clientId: process.env.MICROSOFT_CLIENT_ID || '',
      authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET
    },
    scopes: process.env.MICROSOFT_OAUTH_SCOPES || '',
  }
};
