import configparser
from datetime import datetime
import requests


class SensorData:
    """
    This class is my crown jewel, trying to navigate through the ARCGIS API was terrible!

    Anyways, our class scrapes the latest data from:
    https://atoll.floridamarine.org/arcgis/rest/services/Projects_FWC/HAB_Current/MapServer/0/query?where=0%%3D0&outFields=%%2A&f=json

    And adds the data that isn't already in the database. We confirm that it isn't in the database by getting the
    last sensor ID. This works because the ID goes up by one for each new reading they add.
    """
    def __init__(self, last_id=0):
        config = configparser.ConfigParser()
        config.read('../config.ini')
        self.url = config['sensorData']['url']
        self.last_id = last_id

    def __makeRequest(self):
        """
        Makes a get request to the specified url, and with the various parameters.
            Raises an exception if the request has anything but a status code of 200 which represents an ok.

            Uses the following variables:
                self.url: The URL for the endpoint we're requesting.
        """
        response = requests.get(self.url)
        print(response.status_code)

        if response.status_code != 200:
            raise Exception(response.status_code, response.text)
        return response.json()

    def getData(self) -> list:
        """
        We make the request, and then we parse through the result here.

        We create a dict for eaching reading which looks like this:
            '_id': The ObjectID that they use to classify readings.
            'date': The date of the reading.
            'location': The location of the reading, note: it's kind of vague sometimes.
            'abundance': This is where they're looking at the PPM of Karina Brevis in the sample.
            'source': The agency that provided them with this sample.
            'county': The county where this reading was found.
        """
        response = self.__makeRequest()
        readings = []
        count = 0

        for reading in response['features']:
            if reading['attributes']['OBJECTID'] > self.last_id:
                count += 1
                date = datetime.strptime(reading['attributes']['SampleDate_t']
                                         .strip(), "%b %d %Y")
                data = {
                    '_id': reading['attributes']['OBJECTID'],
                    'date': date,
                    'location': reading['attributes']['LOCATION'],
                    'abundance': reading["attributes"]['Abundance'],
                    'source': reading['attributes']['Source'],
                    'county': reading['attributes']['County']
                }

                readings.append(data)

        print(f'Added {count} new sensor data samples!')
        return readings
