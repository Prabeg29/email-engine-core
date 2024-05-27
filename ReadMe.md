## Email Engine Core
A core system for an email client with essential functionalities. This system will connect with user email accounts (initially focusing on Outlook) and manage email data efficiently.

### Technical Requirements:
#### Database:
[] - Implement a database, preferably using Elasticsearch, to store all user email address information.
[] - Design separate indices for:
  - Email messages associated with each user address.
  - Mailbox details for each user address.

#### API Development:
[] - Create an API endpoint that allows users to create a local account and link it with their Outlook email address using OAuth.
[]- Upon account creation, the API should:
 - Generate a URL for users to log in with their Outlook account.
 - Redirect users back to a specified callback URL after successful login.
 - Save the logged-in user's details and access token securely.

Don't forget, that the created account has a local ID. This ID will be
attached to the email data and mailboxes later on.

#### Email Data Synchronization:
[] - Synchronize email data from Outlook to the local database upon successful account linking.
[] - Handle rate limits and other potential challenges encountered during data fetching from Outlook.
[] - Index all retrieved email data locally with unique identifiers for future reference.
[] - Continuously monitor for changes in user email data (e.g., moved emails, read/unread status, flags, deletions, new emails) even during the initial sync.
[] - Update the local data accordingly to reflect these changes.

#### Frontend showcase:
[] - Simple add account page (that reflect connection with outlook and the initial sync proccess after)
[] - Data page:
 - Display real-time updates on the ongoing data synchronization process.
 - Present a list of fetched or updated emails in a simple format, including:
    - Subject line
    - Sender name/email address

#### Others
[] - A simple interface to display ongoing account activity (during data sync and real-time updates).
[] - Dockerized application with a docker-compose environment and clear documentation for running the project.
