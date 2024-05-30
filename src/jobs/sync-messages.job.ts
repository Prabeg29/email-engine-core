import { Job, Queue, Worker } from "bullmq";

import { esClient } from "../utils/elastic-search.util";
import { getMessages } from "../integrations/outlook.integration";

export const syncMessages = new Queue('sync-messages', { connection: { host: 'localhost', port: 6379 } });

interface User {
  homeAccountId: string,
  username: string,
  localAccountId: string,
  tokenType: string,
  accessToken: string,
  expiresOn: string,
  idToken: string
}

new Worker('sync-messages', async (job: Job<{ homeAccountId: string }>) => {
  try {
    const results = await esClient.search<User>({
      index: 'users',
      query: {
        match: {
          homeAccountId: job.data.homeAccountId
        }
      }
    });
    
    const accessToken: string = results.hits.hits[0]._source?.accessToken as string;
  
    const result2 = await getMessages(accessToken);
  
    console.log('messages => ', result2);
  } catch (err) {
    
  }
}, { connection: { host: 'localhost', port: 6379 } });
