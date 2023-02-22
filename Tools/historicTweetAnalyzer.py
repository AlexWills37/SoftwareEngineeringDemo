# For Python3
# Updated 19 April 2022
#
# Created by Alex Wills
# This code reads a CSV file and processes it to store/display information about historical twitter data.
# CSV data from: https://github.com/tbep-tech/red-tide-twitter
# 
# If adapting this code to read and process other CSV files, see the # NOTE: comments
# Resources:
#   Reading file: https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files
#   Reading CSV file: https://docs.python.org/3/library/csv.html
#   Using 'with' keyword to simplify file streams: https://www.educative.io/edpresso/the-with-statement-in-python
#   Using dictionaries in python: https://www.w3schools.com/python/python_dictionaries.asp
#   Python json package: https://docs.python.org/3/library/json.html

import csv
import json
import RedTideDB

class TweetAnalyzer:
    ''' Gathers, analyzes, and stores frequency information about Tweets. 
    Scans a CSV file and counts the number of tweets per month. '''

    def __init__(self):
        ''' Creates a TweetAnalyzer '''

        # NOTE: This is where you can change the location of the CSV file
        self.csvPath = 'Data/Secure_Tweets_Data.csv'

        # Each key is a time period (x-axis), and each value is the number of tweets that are in the time period
        self.frequencyDictionary = {}


    def analyzeCSV(self, csvPath = None):
        ''' Iterate through the CSV file and extract the relevant information '''
        
        with open(self.csvPath, 'r', encoding = 'utf-8', newline = '') as csvFile: # Bug note: Because of some tweets, you must specify encoding = 'utf-8'
            
            # Get excel dialect and ensure the quoting is set to minimal
            csv.register_dialect('tweetcsv', quoting=csv.QUOTE_MINIMAL)
            # This means that quotations are around fields with the delimiter, quotechar, or any linterminator characters.
            # We have quotes around all the headers
            # No quotes around ID, date, number fields, boolean fields, and NA fields

            csvReader = csv.reader(csvFile, 'tweetcsv')


            # Every line in the CSV corresponds to a Tweet, which has an array of values (each column in the csv)
            date = ''
            
            # Read every row of the csv
            for line in csvReader:

                # Date is the second element in the row
                date = line[1]
                # Date is xxxx-xx-xx for year-month-date, which is 10 characters
                # Also date[0:4] should be the year, which is a digit
                if (len(date) == 10 and (date[0:4].isdigit())):
                    self.countTweetByMonth(date)
                    
        # End of with
        # note: the 'with' statement closes the file automatically

    def countTweetByMonth(self, date: str):
        ''' Increments the frequency value in the dictionary to count a tweet based on its month. 
        Parameters:
        date - date of the tweet in [year-month-day] format '''

        # NOTE: If reading a CSV to store different information, you may want to change this logic to create different keys

        separatedDate = date.split('-')

        # To store tweets by their month, we need to combine the month and year
        dictionaryKey = separatedDate[0] + '/' + separatedDate[1]

        # If the key is in the dictionary, increment the value to count the tweet
        if dictionaryKey in self.frequencyDictionary:
            self.frequencyDictionary[dictionaryKey] = self.frequencyDictionary[dictionaryKey] + 1

        # If the key is not in the dictionary, count the tweet by adding a key value pair
        else:
            self.frequencyDictionary[dictionaryKey] = 1

    def getFrequencyDictionary(self) -> dict:
        ''' Returns the frequency dictionary used by this analyzer '''
        return self.frequencyDictionary

    def getFrequency(self, month, year) -> int:
        ''' Get the number of tweets from a certain month/year combination 
        Parameters
        month - month in 2-digit number form
        year - year in 4-digit number form
        
        Return
        int representing the number of tweets in the specified month/year '''
        # Make sure month is 2 digits
        if( len( str( month ) ) == 1):
            month = '0' + str(month)

        key = str(year) + '/' + str(month)

        # If key is not in dictionary, return 0 for 0 tweets
        if not (key in self.frequencyDictionary):
            return 0

        else:
            return self.frequencyDictionary[key]
    
    def writeJson(self) -> dict:
        ''' Converts the frequency dictionary into a json string '''
        # return json.dumps(self.frequencyDictionary, sort_keys = True, indent = 2)

        frequencyData = []
        
        
        for year in range(2017, 2020):
            for month in range(1, 13):
                frequencyData.append([str(year) + "/" + str(month), self.getFrequency(month, year)])

        jsonDict = {'data': frequencyData}


        # jsonDict = self.frequencyDictionary
        print("DICTIONARIY: ", jsonDict)
        return jsonDict

    def addJsonToDatabase(self):
        ''' Stores JSON representation of CSV, formatted for Google Chart, in our database. '''
        database = RedTideDB.RedTideDB()
        database.addHistoricalData(self.writeJson())
        database.close()

def testTweetAnalyzer():
    ''' Tests the tweet analysis class and its methods. '''

    analyzer = TweetAnalyzer()
    analyzer.analyzeCSV()

    dictionary = analyzer.getFrequencyDictionary()
    print ('all frequency data: ' + str(analyzer.getFrequencyDictionary()))
    # There are 57653 total tweets
    sum = 0
    for key in dictionary:
        sum += dictionary[key]

    print ("total tweets: " + str(sum))
    print ("known total: 57653")

    print ('months available: ' + str(dictionary.keys()))

    print('Going through months/years')
    
    # Something like this would let you plot the data over time
    for year in range(2016, 2020):
        for month in range(1, 13):
            print('Month: ' + str(month) + '/' + str(year) + ': ' + str(analyzer.getFrequency(month, year)) + ' tweets')

    print( analyzer.writeJson() )

    analyzer.addJsonToDatabase()

def main():
    """"""
    testTweetAnalyzer()
    

if __name__ == '__main__':
    main()