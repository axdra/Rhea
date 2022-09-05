
#handle args
import argparse
from json import dumps
import os
import time

import requests

from supabase import create_client, Client

from icalendar import Calendar
import html

from datetime import date, datetime


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

if __name__ == '__main__':
    # get env variables
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_anon_key = os.getenv('SUPABASE_ANON_KEY')
    supabase_secret_key = os.getenv('SUPABASE_SECRET_KEY')
    parser = argparse.ArgumentParser()
    parser.add_argument('--supabase-url', help='Supabase project URL, defaults to env variable', default=supabase_url )
    parser.add_argument('--supabase-anon-key', help='Supabase anon key, defaults to env variable', default=supabase_anon_key )
    parser.add_argument('--supabase-secret-key', help='Supabase secret key, defaults to env variable', default=supabase_secret_key )
    args = parser.parse_args()
    sb_client:Client = create_client(args.supabase_url, args.supabase_secret_key)


    args = parser.parse_args()
    courses = sb_client.table('Calendars').select('code','id').execute()
    events = []
    timeNow = time.time()
    totalreqs = 0
    for course in courses.data:
        url = "https://webbschema.mdu.se/setup/jsp/SchemaICAL.ics?startDatum=idag&intervallTyp=a&intervallAntal=1&sprak=SV&sokMedAND=true&forklaringar=true&resurser=k."+course['code']
        ical = requests.get(url).content
        cal = Calendar.from_ical(ical)
        totalreqs += 1
        if(totalreqs % 100 == 0):
            #for every 100 requests print the time it took to get the data
            print("Time taken: ", time.time() - timeNow)
            print("Total requests: ", totalreqs)
            print("Total events: ", len(events))
            sb_client.table('Events').insert(events).execute()
            events = []
        #create a list of events
        for component in cal.walk():
            if(component.get('location') != None):
                room = component.get('location')
                name = html.unescape(component.get('summary'))
                start_date = component.get('dtstart').dt
                end_date = component.get('dtend').dt
                created_at = component.get('created').dt
                last_update = component.get('last-modified').dt
                aid= ""
                if(len(name.split('Sign:')) >1  ):
                    teacher= name.split('Sign:')[1].split("Moment: ")[0].strip()
                else:
                    teacher= ""
                if(len(name.split('Moment: ')) > 1):
                    name = name.split('Moment: ')[1].strip()
                else:
                    name = ""
                event = {
                    "name":  name,
                    "teacher": teacher,
                    "room": room,
                    "start_date": dumps(start_date, default=json_serial),
                    "end_date": dumps(end_date, default=json_serial),
                    "created_at": dumps(created_at, default=json_serial),
                    "last_update": dumps(last_update, default=json_serial),
                    "aid": aid,
                    "parent_calendar": course['id']
                }
                events.append(event)
    sb_client.table('Events').delete().neq('id',0).execute()
    sb_client.table('Events').insert(events).execute()


