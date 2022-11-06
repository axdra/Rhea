session = ""
url = "https://webbschema.mdu.se/ajax/ajax_session.jsp?op=poll"


import time
import requests

while True:
    r = requests.get(url, cookies={"JSESSIONID": session})
    print(r.text)
    time.sleep(60)

