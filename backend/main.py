from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep
test_url = "https://webbschema.mdu.se/allaKurser.jsp"
import os
from supabase import create_client, Client
from bs4 import BeautifulSoup

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
def __main__():

    courses_list = []
    driver = webdriver.Edge(executable_path='C:\\Users\\Axel\\Desktop\\edgedriver_win64\\msedgedriver.exe')
    driver.get(test_url)
    sleep(2)
    elems = driver.find_element(By.CSS_SELECTOR, "#resultatdiv")
    soup = BeautifulSoup(elems.get_attribute('innerHTML'), 'html.parser')

    for course in soup.find_all('li'):
        course_URL = "https://webbschema.mdu.se/"+course.find('a', href=True)['href']
        course_name = course.find('a', href=True).text.strip()
        course_code = course.text.split('(')[1].split(')')[0] 
        course_obj = {
            "name": course_name,
            "URL": course_URL,
            "code":  course_code 
        }
        courses_list.append(course_obj)
    supabase.table('Courses').insert(courses_list).execute()
    driver.close()
    driver.quit()


if __name__ == "__main__":
    __main__();


