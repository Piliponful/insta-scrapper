import { ApifyClient } from 'apify-client'
import _ from 'lodash'

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: 'apify_api_dnbnzNLIrTwud310W5e0miUpv1N8dw25ozqo'
})

// Prepare Actor input
const input = {
  username: [
    'sneako'
  ],
  resultsLimit: 30
};

(async () => {
  // Run the Actor and wait for it to finish
  const run = await client.actor('apify/instagram-post-scraper').call(input, { memory: 8192 })

  // Fetch and print Actor results from the run's dataset (if any)
  console.log('Results from dataset')
  const { items } = await client.dataset(run.defaultDatasetId).listItems()

  const newItems = _.sortBy(items.map(i => _.omit(i, ['latestComments'])), 'likesCount')

  newItems.forEach((item) => {
    console.dir(_.pick(item, ['likesCount', 'caption']))
  })
})()
