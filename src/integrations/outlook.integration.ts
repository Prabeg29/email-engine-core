import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

import config from "../config";

export const msalClient = new ConfidentialClientApplication({ auth: { ...config.msal.auth } });
