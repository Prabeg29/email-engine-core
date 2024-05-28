import { Client } from '@elastic/elasticsearch';

import logger from './logger.util';

const esClient = new Client({ node: 'http://localhost:9200' });

async function initializeIndices() {
  return new Promise(async (resolve, reject) => {
    try {
      await esClient.ping();

      const usersIndexExists = await esClient.indices.exists({ index: 'users' });

      if (!usersIndexExists) {
        await esClient.indices.create({ index: 'users' });
      }

      const emailMessagesIndexExists = await esClient.indices.exists({ index: 'email_messages' });

      if (!emailMessagesIndexExists) {
        await esClient.indices.create({ index: 'email_messages' });
      }

      const mailBoxDetailsIndexExists = await esClient.indices.exists({ index: 'mailbox_details' });

      if (!mailBoxDetailsIndexExists) {
        await esClient.indices.create({ index: 'mailbox_details' });
      }

      resolve(true);
    } catch (err: any) {
      logger.error('Elasticsearch: Something went wrong', { error: err });

      reject(false);
    }
  });
}

export { esClient, initializeIndices };
