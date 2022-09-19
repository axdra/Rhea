
#handle args
import argparse
import os
from time import sleep
from bs4 import BeautifulSoup
from supabase import create_client, Client
import requests
import time
from supabase import create_client, Client



if __name__ == '__main__':
    # get env variables
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_anon_key = os.getenv('SUPABASE_ANON_KEY')
    supabase_secret_key = os.getenv('SUPABASE_SECRET_KEY')
    #parse args
    parser = argparse.ArgumentParser()
    parser.add_argument('--supabase-url', help='Supabase project URL, defaults to env variable', default=supabase_url )
    parser.add_argument('--supabase-anon-key', help='Supabase anon key, defaults to env variable', default=supabase_anon_key )
    parser.add_argument('--supabase-secret-key', help='Supabase secret key, defaults to env variable', default=supabase_secret_key )
    args = parser.parse_args()
    

    # check if variables are set
    if not supabase_url or not args.supabase_url:
        raise TypeError( 'No supabase url set')
    if not supabase_anon_key or not args.supabase_anon_key:
        raise TypeError('No supabase anon key set')
    if not supabase_secret_key or not args.supabase_secret_key:
        raise TypeError('No supabase secret key set')
    sb_client:Client = create_client(args.supabase_url, args.supabase_secret_key)
    
    courses = sb_client.table('Courses').select('URL','id').execute()
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
    
    sb_client.table('Calendars').delete().neq('id',0).execute()
    sb_client.table('Calendars').insert(calendars).execute()
  


