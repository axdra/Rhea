from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep
test_url = "https://webbschema.mdu.se/allaKurser.jsp"
import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
def __main__():

    courses_list = []
    driver = webdriver.Edge(executable_path='/Users/axdra/Documents/edgedriver_mac64/msedgedriver')
    driver.get(test_url)
    sleep(2)
    elems = driver.find_element(By.CSS_SELECTOR, "#resultatdiv")
    courses = elems.find_elements(By.CSS_SELECTOR, "li")
    for course in courses:
        obj = {
            "name":course.find_element(By.TAG_NAME,'a').text.strip(),
            "URL":course.find_element(By.TAG_NAME,'a').get_attribute('href'),
            "code": course.text.split('(')[1].split(')')[0] 
        }
        courses_list.append(obj)
        supabase.table('Courses').insert(obj).execute()
        print(obj)
   
    print(courses_list)
    driver.close()
    driver.quit()


if __name__ == "__main__":
    __main__();


