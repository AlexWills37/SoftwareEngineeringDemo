"""
toolController.py

Rather than calling our Twitter, YouTube, Spotify, and SensorData scrapers individually, we thought to create a
 centralized script that makes automation easier.

 To run:
 python3 toolController.py

 Assuming you have the config.ini file, and the subsequent scrapers, call this and all the other scrapers will be run.
 To be paired with cron, or some sort of other automation file.

 - PG
"""

from Tools.TwitterScraper import TwitterScraper
from Tools.SensorData import SensorData
from Tools.RedTideDB import RedTideDB


def getTweets(database: RedTideDB, query: str):
    """
    getTweets

    Creates a new TwitterScraper object, passes in the last saved tweet ID to prevent duplicates, and scrapes the tweets,
    and then passes said tweets into the database to be added.

    Parameters:
        database: The database, specifically built for the RedTideDB class.
        query: Contains the query we're using to get the tweets. See the twitterScraper.py documentation for more info.

    - PG
    """
    tweets = TwitterScraper(last_id=database.getLastTweet())
    print("Scraping Tweets")
    data = tweets.get_tweets(query)
    print("Adding Tweets")
    database.addTweets(data)
    return


def addSensorData(database: RedTideDB):
    """
    addSensorData

    Creates a new SensorData object, and passes in the latest sensor data's ID to prevent duplicates. Scrapes the sensor
    data, and then adds it to the database.

    Parameters:
        database: The database, specifically built for the RedTideDB class.

    - PG
    """
    sensors = SensorData(database.getLastSensorData())
    print("Stealing Sensor Data")
    data = sensors.getData()
    print("Adding Sensor Data")
    database.addSensorData(data)
    return


if __name__ == '__main__':
    db = RedTideDB()

    query_one = {
        'query': 'red tide -is:retweet -is:quote -roll -is:reply',
        'tweet.fields': 'created_at,public_metrics',
        'max_results': 100,
        'expansions': 'author_id'
    }

    getTweets(db, query_one)
    addSensorData(db)
    db.close()
