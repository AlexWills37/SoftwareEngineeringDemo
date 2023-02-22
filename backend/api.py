"""
api.py, our wonderful flask backend.

For each request that is made, makes a request to our backend, and then returns that request as a json (assuming it's a
valid request)

For a quick and dirty rundown of how to create an endpoint, do the following:

First you must define the @app.route, which is basically the address that you want to setup the endpoint on.

For example, '/api/v1/redtide/tweets/all' will actually be http://<ourwebsite>.com/api/v1/redtide/tweets/all on the web.
You can also add an additional parameter, "methods=" which will be used to define what kind of messages the endpoint
can receive, such as POST or GET. i.e. methods=['GET']


Then we need to add @cross_origin, so another site, our front end for example, can make a request of our endpoints.

Next you'll define a function, where you'll basically do all the heavy lifting.

For inputs, such as a limit on how many tweets we pull, you would use the check to see if 'limit' in requests.args,
and for future notice, you can get an unlimited number of
"""

import configparser
import flask
import certifi
import time
from pymongo import MongoClient

from flask import request, jsonify, redirect
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin

config = configparser.ConfigParser()
config.read('../config.ini')
mdb = config['mongoDB']

# establish the "connection string" that we use to connect to the db with.
cs = f"mongodb+srv://{mdb['username']}:{mdb['pw']}@{mdb['server']}/redtideDB"

app = flask.Flask(__name__)

# Allow CORS - for these calls to be accessed from any browser
CORS(app)
app.config["DEBUG"] = True
app.config["MONGO_URI"] = cs
ca = certifi.where()
mongo = PyMongo(app, tlsCAFile=ca)
client = MongoClient(cs, tlsCAFile=ca)


@app.route('/t')
def test():
	return "<h1 style='color:blue'>HELLO WELCOME TO MY WEBSITE :) </h1>"


@app.route('/')
def home():
    """
    Redirect sends the person to a different URL, and in this case to the climbing club website :)

    - PG
    """
    return redirect("https://climbncf.github.io/")

@app.route('/api/v1/redtide/tweets/all', methods=['GET'])
@cross_origin()
def api_all_tweets():
    """
    This method is used for getting and returning all tweets in our mongoDB.
    We use find() to get the tweets, and then we use sort().
    Sort uses the tweet id (_id) and displays it from the newest to the oldest thanks to the -1.

    - PG
    """
    tweets = mongo.db.tweets.find().sort([('_id', -1)])
    results = []
    for tweet in tweets:
        results.append(tweet)
    return jsonify(results)


@app.route('/api/v1/redtide/tweets/history/frequency', methods=['GET'])
@cross_origin()
def api_historical_tweet_frequency():
    """
    This method is used for returning the historical Tweet frequency from our database.
    The data originally came from Professor Skripnikov's research, and was processed by our
    historicalTweetAnalyzer.py.
    The data is already processed and formatted to go into a Google Charts component.
    """
    tweetHistory = mongo.db.tweetHistory.find_one()
    response = jsonify(tweetHistory['data'])
    return response


@app.route('/messages/all', methods=['GET'])
@cross_origin()
def api_all_messages():
    """
    This method is used for getting and returning all messages in our mongoDB.
    This is the same logic as philip's tweet return code.
    We use find() to get the messages, and then we use sort().
    Sort uses the message id(unix time) and displays it from the newest to the oldest.

    - FW
    """
    messages = mongo.db.messages.find().sort([('_id', -1)])
    results = []
    for message in messages:
        results.append(message)
    return jsonify(results)


@app.route('/messages/send')
@cross_origin()
def api_query_messages():
    """
    Used for sending messages from the chatboard onto MongoDB. 
    Takes data from the fetch request and adds that data onto the database.
    Inputs: name, location, message, score, time, time
    Gives most recent unix time as when the data is recieved it can be sort by time.
    ex: ?message="Message"&location="location"
    
    - FW
    """
    
    # values from fetch request
    inname = request.args.get('name')
    inlocation = request.args.get('location')
    inmessage = request.args.get('message')
    inscore = request.args.get('score')
    unixtime = time.time()
    db = client.redtideDB
    # creates new mongodb document
    Message = {"name": inname, "location": inlocation, "message": inmessage, "score": inscore, "_id": unixtime, "time": unixtime}
    
    # adds document to "messages" collection
    db.messages.insert_one(Message)
    return '''<h1>{}{}{}</h1>'''.format(inname, inlocation, inmessage)
    

@app.route('/messages/updatescore')
@cross_origin()
def api_update_messages():
    """
    Used for adding or subtracting a score value onto a message.
    Takes in the time field and score field, makes a copy of the current message, deletes it, replaces it with an identical message with updated score field.
    Saves all of the variables in the message before it is deleted to append to the replacement messsage.
    
    -FW
    """
    
    # data from fetch request
    index = request.args.get('index')
    inscore = request.args.get('score')
    intime = request.args.get('time')
    db = client.redtideDB
    
    # converts time into float
    intime = float(intime)
    print(intime)
    print(intime)
    print(intime)
    # gets message that has that specific time value
    message_to_modify = mongo.db.messages.find_one({'time': intime})
    print(message_to_modify)
    # saves values from message about to be deleted
    time = message_to_modify['_id']
    savedname = message_to_modify['name']
    savedmessage = message_to_modify['message']
    savedlocation = message_to_modify['location']
    savedscore = message_to_modify['score']
    newscore = inscore
    
    # deletes the message
    mongo.db.messages.delete_one({'time':  time})
    
    # replacement message with updated score field
    Message = {"name": savedname, "location": savedlocation, "message": savedmessage, "score": inscore, "_id": time, "time": time}
    
    # adds the replacement message
    db.messages.insert_one(Message)
    return '''<h1>{}{}{}</h1>'''.format(index, inscore, intime)

@app.route('/api/v1/redtide/youtube', methods=['GET'])
@cross_origin()
def api_youtube_video():
    """
    This method gets one of the recent youtube videos from our database.
    PARAMETERS
    add "?category=[category]" to the end of the URL, where [category] is the name of the topic
    to search from the database (what kind of video you want: symptoms, information, trending). The
    category must match the video's category stored in our database (not related to how YouTube organizes videos).
    """

    recentVideo = None

    # Use parameter in video
    if 'category' in request.args:

        # Search the database for videos in the chosen category
        youtube = mongo.db.youtube
        videoCategory = youtube.find({'category': request.args['category']}, sort=[('databaseInsertDate', -1)], limit=1)

        # This for loop is not the most elegant solution, but it works.
        # The .find result should only contain a single element, so this is still optimized
        for video in videoCategory:
            recentVideo = video

        if (recentVideo == None):
            print("Error: there is no video in this category")

    return recentVideo


@app.route('/api/v1/redtide/tweets', methods=['GET'])
@cross_origin()
def api_tweets():
    """
    This method is used for getting and getting x amount of tweets in our mongoDB.
    We use find() to get the tweets, and then we use sort().
    Sort uses the tweet id (_id) and displays it from the newest to the oldest.
    We then use limit to the latest x tweets.

    An example query would be:
   "/api/v1/redtide/tweets?limit=5"

    Which would request the five latest tweets added to the database.

    - PG
    """
    if 'limit' in request.args:
        try:
            tweets = mongo.db.tweets.find().sort([('_id', -1)]).limit(int(request.args['limit']))
        except ValueError:
            return ValueError(f"Invalid Limit"), 400

        else:
            results = []
            for tweet in tweets:
                results.append(tweet)

            return jsonify(results)
    else:
        return "Error: No limit provided. Please specify a limit.", 400


@app.route('/api/v1/redtide/historical/month', methods=['GET'])
def api_last_month():
    return "hi this doesn't work yet :)"


@app.route('/api/v1/redtide/cellcounts', methods=['GET'])
@cross_origin()
def api_cell_counts():
    """
    This method is used for getting all of the algae cell count data in our database.
    We use find() to get all of the documents, then we use sort() to order them by county, alphabetically.
    """

    # Get a cursor to iterate over the documents

    documents = mongo.db.sensorData.find().sort([('county', 1)])
    data = []

    # Add every document to the list
    for entry in documents:
        # Remove ObjectID to avoid type conflicts
        entry.pop('_id')
        data.append(entry)

    return {'cellCountList': data}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
