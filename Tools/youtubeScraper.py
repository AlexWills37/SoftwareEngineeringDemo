'''
Youtube Scraper to retrieve relevant videos from youtube.
Much of this code was adapted from Google's API example: https://developers.google.com/explorer-help/code-samples#python
Usage:
    Create a YoutubeScraper object (ytScraper = YoutubeScraper())
    Call any of the methods that begin with 'search' to obtain the search result in the form of a JSON formatted by YouTube.

    SEARCHING FOR A VIDEO
        GENERAL SEARCH: searchForVideo(quantity: int, query: str, channelID)
            Specify the number of videos you would like to obtain, your search term, and optionally a channel ID.
            If you specify a channel ID, this tool will ONLY search within that channel. If you do not specify a channel
            ID, this tool will search all of youtube.
        
        SPECIALIZED SEARCHES: searchRelevantMoteVideo(), searchRelevantMedicalVideo(), searchRelevantTrendingVideo()
            The Mote method will only search the Mote Marine Lab channel, and it will search "red tide".
            The Medical method will only search the Sarasota Memorial channel, and it will search "red tide symptoms".
            The Trending method will search all of youtube, and it will search "red tide".
            Optionally, you can pass in a string to any of these methods to override the search query with your own query.
            These methods will all only return one video.
    
    USING THE RETURN RESULTS (YouTube JSON format)
        GENERAL SEARCH:
            For this section, I will name the return result (result)
            The searchForVideo method returns the raw response generated by YouTube from your search.
            To get a list of videos, do index into items: result['items']
            You can then iterate or search this list by index.
            result['items'][0] will be the JSON representaiton of the top video in the search result.

        OTHER SEARCHES:
            The other search methods do a little work for us and return a sigle video. Technically, it is 
            returning result['items'][0]. This is a YouTube video, in JSON format.
            For a full description of what this JSON looks like, see: https://developers.google.com/youtube/v3/docs/search#resource 
            and scroll down to Resource Representation.
            For the Red Tide dashboard, we only need the video ID, which can be accessed by taking these methods' return result,
            and indexing like this: video['id']['videoId']


@author Alex Wills
'''
import os

import googleapiclient.discovery
import configparser


class YoutubeScraper:
    """ Class to hold general information and methods to do API calls with YouTube """

    # Channel IDs
    MOTE_ID = 'UC0Tvo7Chnyvgliwrmiqosbg'
    SARASOTA_MEMORIAL_ID = 'UCGBD7uXRwp_lb2Mpu2XupBQ'

    def __init__(self):
        # Get developer key from config file
        config = configparser.ConfigParser()
        config.read('../config.ini')
        self.DEVELOPER_KEY = config['youtube']['api_key']

        # Create a reference to the google API for youtube
        self.youtube = googleapiclient.discovery.build('youtube', 'v3', developerKey=self.DEVELOPER_KEY)

    def searchForVideo(self, videoQuantity: int, query: str, channelID=None):
        """ Uses YouTube API to search for videos.

        PARAMETERS
        videoQuantity: how many search results you want to return
        query: the search term to use
        (optional) channelID: the channel to search from

        RETURN - The YouTube API response json. Index into ['items'] to get the videos from this search. """

        # Create the request
        request = self.youtube.search().list(
            part='snippet',
            channelId=channelID,
            maxResults=videoQuantity,
            q=query,
            type='video',
            videoEmbeddable='true'
        )

        # Carry out the request and return it
        return request.execute()

    def searchRelevantMoteVideo(self, query: str = 'red tide'):
        """ Searches the Mote Marine YouTube channel for a video and returns the video in YouTube's json format
        RETURN - json dictionary containing all information about the video, including its ID
        NOTE - to get the video id, take the output of this function, and index ['id']['videoId'] """

        response = self.searchForVideo(1, query, YoutubeScraper.MOTE_ID)

        return response['items'][0]

    def searchRelevantMedicalVideo(self, query: str = 'red tide symptoms'):
        """ Searches the SMHCS YouTube channel for a video and returns the video in YouTube's json format
        RETURN - json dictionary containing all information about the video, including its ID
        NOTE - to get the video id, take the output of this function, and index ['id']['videoId'] """

        response = self.searchForVideo(1, query, YoutubeScraper.SARASOTA_MEMORIAL_ID)

        return response['items'][0]

    def searchTrendingVideo(self, query: str = 'red tide'):
        ''' Searches all of YouTube for the most relevant video 
        RETURN - json dictionary containing all information about the video, including its ID.'''

        response = self.searchForVideo(1, query)

        return response['items'][0]


def main():
    scraper = YoutubeScraper()
    print(scraper.searchTrendingVideo())


if __name__ == "__main__":
    main()
