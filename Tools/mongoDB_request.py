import configparser
import pprint
import requests
import json

config = configparser.ConfigParser()
config.read('config.ini')

mdbr = config['mongoDB']

url = mdbr['url']
payload = json.dumps({
    "collection": "tweets",
    "database": "redtideDB",
    "dataSource": "Project-3",
    "limit": 3,
    'sort': {'_id': -1}
})
headers = {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': mdbr['api']
}
response = requests.request("POST", url, headers=headers, data=payload)

pprint.pprint(response.json())
