from icalendar import Calendar
import os

directory = os.path.dirname(__file__)
with open(os.path.join(directory, 'test.ics'), 'rb') as fp:
    data = fp.read()

cal = Calendar.from_ical(data)
for component in cal.walk():
    print(component.get('location'))