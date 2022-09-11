from datetime import date
from time import sleep
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import requests
from icalendar import Calendar
import html

from time import sleep
test_url = "https://webbschema.mdu.se/allaKurser.jsp"
import os
from supabase import create_client, Client
from bs4 import BeautifulSoup
from datetime import date, datetime

from json import dumps
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))


def get_courses():

  


def get_calendars():
    courses = supabase.table('Courses').select('URL','id').execute()
    calendars = []
    totalreqs = 0
    timeNow = time.time()

    for course in courses.data:
        soup = BeautifulSoup(requests.get(course['URL']).content, "html.parser")
        items = soup.select('.resursLista li')
        totalreqs += 1
        if(totalreqs % 100 == 0):
            #for every 100 requests print the time it took to get the data
            print("Time taken: ", time.time() - timeNow)
            print(f"Total requests: {totalreqs} of {len(courses.data)}")
            print("Total calendars: ", len(calendars))
        for item in items:
            name = item.text;
            if(name == "Visa undergrupper"):
                continue
            
            code = item.text.split('(')[-1].split(')')[0]
            name = name.replace(f"({code})", "").replace('Visa undergrupper','').strip()
            link = item.select('a', href=True)[1].get('href')
            
            calendar = {
                "name": name,
                "code": code,
                "URL": link,
                "parent_course": course['id']
            }
            calendars.append(calendar)
    supabase.table('Calendars').insert(calendars).execute()
    
        
def get_events():
    courses = supabase.table('Calendars').select('code','id').execute()
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
            supabase.table('Events').insert(events).execute()
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
    supabase.table('Events').insert(events).execute()



def clear_all_tables():
    supabase.table('Events').delete().neq('id',0).execute()
    supabase.table('Calendars').delete().neq('id',0).execute()
    supabase.table('Courses').delete().neq('id',0).execute()


def __main__():
    #clear_all_tables()
    #get_courses()
    #get_calendars()
    get_events()



if __name__ == "__main__":
    __main__();


