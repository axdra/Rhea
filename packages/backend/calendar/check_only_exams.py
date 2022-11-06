#handle args
import argparse
from json import dumps
import os
import time
import requests
import logging

from supabase import create_client, Client

from icalendar import Calendar
import html
logging.basicConfig(filename=f'/var/log/scraper/app.log' , filemode='a', format='%(name)s - %(levelname)s - %(message)s')
logging.info("Starting scraper")

from datetime import date, datetime
# set log name as date and time
if __name__ == '__main__':
    # get env variables
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_secret_key = os.getenv('SUPABASE_SECRET_KEY')
    #parse args
    parser = argparse.ArgumentParser()
    parser.add_argument('--supabase-url', help='Supabase project URL, defaults to env variable', default=supabase_url )
    parser.add_argument('--supabase-secret-key', help='Supabase secret key, defaults to env variable', default=supabase_secret_key )

    args = parser.parse_args()

    # check if variables are set
    if not supabase_url and not args.supabase_url:
        raise TypeError( 'No supabase url set')
    if not supabase_secret_key and not args.supabase_secret_key:
        raise TypeError('No supabase secret key set')
    sb_client:Client = create_client(args.supabase_url, args.supabase_secret_key)


    args = parser.parse_args()
    courses = sb_client.table('calendars').select('code','id','name').execute()
    events = []
    
    timeNow = time.time()
    totalreqs = 0
    for course in courses.data:
        if("endast" not in course['name']):
            continue
        logging.info("Checking course: " + course['name'])
        url = "https://webbschema.mdu.se/setup/jsp/SchemaICAL.ics?startDatum=idag&intervallTyp=a&intervallAntal=1&sprak=SV&sokMedAND=true&forklaringar=true&resurser=k."+course['code']
        ical = requests.get(url).content
        cal = Calendar.from_ical(ical)
        totalreqs += 1
        if(totalreqs % 100 == 0):
            print("Total requests: " + str(totalreqs))
            print(len(events))
        #create a list of events
        for component in cal.walk():
            if(component.get('location') != None):
                name = html.unescape(component.get('summary'))
                event = {
                    "name":  name,
                }
                events.append(event)
    logging.info("Time taken: ", time.time() - timeNow)
    logging.info("Total requests: ", totalreqs)
    logging.info("Total events to insert: ", len(events))
    print(events)
    print(len(events))

