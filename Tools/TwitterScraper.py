import configparser
from dateutil import parser
import requests


class TwitterScraper:
    """
    TwitterScraper

    A class dedicated to scraping Twitter, it requires a config file in the same directory that contains bearer, api,
    and api secret keys.

    Designed around the recent tweet API, so mileage may vary when trying to use it for different things.

    We're using the Twitter API v2 endpoints, as you can see in the default search url below. This should (?) work with
    the v1 endpoints as well. If not, feel free to yell at me.

    https://api.twitter.com/2/tweets/search/recent"


    - PG
    """

    def __init__(self, search_url="https://api.twitter.com/2/tweets/search/recent", last_id=0):
        config = configparser.ConfigParser()
        config.read('../config.ini')
        self.bearer_token = config['twitter']['bearer']
        self.search_url = search_url
        self.last_id = last_id

    def bearer_oauth(self, r):
        """
        I don't fully understand this, but it basically verifies who I am using the various tokens that I got from
        Twitter that allows me API access.
        """
        r.headers["Authorization"] = f"Bearer {self.bearer_token}"
        r.headers["User-Agent"] = "RedTide Test"

        return r

    def connect_to_endpoint(self, url, params):
        """
        Makes a get request to the specified url, and with the various parameters.
        Raises an exception if the request has anything but a status code of 200 which represents an ok.

        Parameters:
            url: The URL for the endpoint we're requesting.
            params: The parameters for the request we're making, see the twitter documentation for details.
        """
        response = requests.get(url, auth=self.bearer_oauth, params=params)
        print(response.status_code)

        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
        return response.json()

    def get_tweets(self, query_params):
        """
        get_tweets passes in the query_params to the function connect_to_endpoint to get the tweet response,
        and using that response, collects the various fields from each tweet and creates a dict for each, containing:
            tweetID: which represents a unique id for the tweet, and can be used to create a link to said tweet.
            text: the text of the tweet.
            created_at: a datetime object which represents the time the tweet was created at.
            link: creates a link using the tweet id.
            likes: the number of likes the tweet got.
            replies: the number of replies the tweet got.
            retweets: the number of retweets, and quote retweets the tweet received.

        Returns:
            results: A list of all the tweet dicts
        """

        response = self.connect_to_endpoint(self.search_url, query_params)
        results = []
        count = 0

        for data in response['data']:
            if int(data['id']) > self.last_id:
                count += 1
                date = parser.parse(data['created_at'])
                converted_id = int(data['id'])
                tweet = {
                    '_id': converted_id,
                    'text': data['text'],
                    'created_at': date,
                    'link': f"https://www.twitter.com/twitter/status/{data['id']}",
                    'likes': data['public_metrics']['like_count'],
                    'replies': data['public_metrics']['reply_count'],
                    'retweets': data['public_metrics']['retweet_count'] + data['public_metrics']['quote_count']
                }

                results.append(tweet)
        print(f'Added {count} new tweets!')
        return results
