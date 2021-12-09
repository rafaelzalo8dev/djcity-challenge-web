/*
 * ITunesList Messages
 *
 * This contains all the text for the ITunesList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ITunesList';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ITunesList container!',
  },
  inputs: {
    filter: 'Search by text',
  },
});
