
#handle args
import argparse
import os
import requests

from bs4 import BeautifulSoup
from supabase import create_client, Client

if __name__ == '__main__':
    # get env variables
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_secret_key = os.getenv('SUPABASE_SECRET_KEY')
    #parse args
    parser = argparse.ArgumentParser()
    parser.add_argument('--supabase-url', help='Supabase project URL, defaults to env variable', default=supabase_url )
    parser.add_argument('--supabase-secret-key', help='Supabase secret key, defaults to env variable', default=supabase_secret_key )
    parser.add_argument('--course-url', help='URL to the page of courses', default="https://webbschema.mdh.se/ajax/ajax_resurser.jsp?op=hamtaResursDialog&resurstyp=UTB_KURSINSTANS_GRUPPER" )
    args = parser.parse_args()

    # check if variables are set
    if not supabase_url and not args.supabase_url:
        raise TypeError( 'No supabase url set')
    if not supabase_secret_key and not args.supabase_secret_key:
        raise TypeError('No supabase secret key set')

    courses = {}
    course_instances = {}

    sb_client:Client = create_client(args.supabase_url, args.supabase_secret_key)

    res = sb_client.table('calendars').delete().neq('id',0).execute()
    res = sb_client.table('courses').delete().neq('id',0).execute()

    soup = BeautifulSoup(requests.get(args.course_url).content, "html.parser")
    for row in soup.find_all('tr'):
        tds = row.find_all('td')
        if len(tds):
            course_instance = tds[1].string
            course_name = tds[2].string
            if course_name is None:
                course_name = ""
            course_code = tds[5].string
            course_URL = "https://webbschema.mdu.se/kurs.jsp?id=" + course_code
            course_instance_URL = "https://webbschema.mdu.se/setup/jsp/Schema.jsp?startDatum=idag&intervallTyp=a&intervallAntal=1&sprak=SV&sokMedAND=true&forklaringar=true&resurser=k." + course_instance
            course_obj = {
                "name": course_name,
                "url": course_URL,
                "code":  course_code,
                "org": "MDU"
            }
            courses[course_code] = course_obj

            course_instance_obj = {
                "code": course_instance,
                "url": course_instance_URL,
                "name": course_name,
                "org": "MDU",
                "parent_course": course_code # Store temporary course code, replace with id after we insert course
            }
            course_instances[course_instance] = course_instance_obj

    courses_list = list(courses.values())
    course_instances_list = list(course_instances.values())

    res = sb_client.table('courses').insert(courses_list).execute()

    # Replace all courses with the new courses from db, so we can get the id
    for course in res.data:
        courses[course['code']] = course
    
    # Replace course code with the fk
    for instance in course_instances_list:
        course_code = instance['parent_course']
        course_id = courses[course_code]['id']
        instance['parent_course'] = course_id
    res = sb_client.table('calendars').insert(course_instances_list).execute()
    