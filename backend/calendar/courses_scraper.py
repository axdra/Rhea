
#handle args
import argparse
import os
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
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
    parser.add_argument('--webdriver-path', help='Path to the webdriver for scraper' )
    parser.add_argument('--webdriver', help='Type of webdriver', default='edge' )
    parser.add_argument('--course-url', help='URL to the page of courses', default="https://webbschema.mdu.se/allaKurser.jsp" )
    args = parser.parse_args()

    # check if variables are set
    if not supabase_url and not args.supabase_url:
        raise TypeError( 'No supabase url set')
    if not supabase_secret_key and not args.supabase_secret_key:
        raise TypeError('No supabase secret key set')

    #get webdriver
    if args.webdriver == 'edge':
        driver = webdriver.Edge(args.webdriver_path)
    elif args.webdriver == 'chrome':
        driver = webdriver.Chrome(args.webdriver_path)
    elif args.webdriver == 'firefox':
        driver = webdriver.Firefox(args.webdriver_path)
    else:
        raise TypeError('Invalid webdriver')
    
    courses_list = []

    driver.get(args.course_url)
    sleep(2)
    elems = driver.find_element(By.CSS_SELECTOR, "#resultatdiv")
    soup = BeautifulSoup(elems.get_attribute('innerHTML'), 'html.parser')

    for course in soup.find_all('li'):
        course_URL = "https://webbschema.mdu.se/"+course.find('a', href=True)['href']
        course_name = course.find('a', href=True).text.strip()
        course_code = course.text.split('(')[1].split(')')[0] 
        course_obj = {
            "name": course_name,
            "url": course_URL,
            "code":  course_code 
        }
        courses_list.append(course_obj)
    sb_client:Client = create_client(args.supabase_url, args.supabase_secret_key)
    sb_client.table('courses').delete().neq('id',0).execute()
    sb_client.table('courses').insert(courses_list).execute()
    driver.close()
    driver.quit()
        


