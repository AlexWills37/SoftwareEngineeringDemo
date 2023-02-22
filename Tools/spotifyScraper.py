"""

Sample Spotify Scraping Script

Used as an example of how I would gather data from Spotify.

- PG
"""

import configparser

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pprint3

config = configparser.ConfigParser()
config.read('../config.ini')

auth_manager = SpotifyClientCredentials(client_id=config['spotify']['id'], client_secret=config['spotify']['secret'])
sp = spotipy.Spotify(auth_manager=auth_manager)


q = 'name:Environment&type=show,episode&market=US'
result = sp.search(q="Red Tide", type="show,episode", market="US")

pprint.pprint(result)
search = "red tide"


