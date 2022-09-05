

import json
import os
import argparse
import requests

from supabase import create_client, Client

if __name__ == '__main__':
    # get env variables
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_anon_key = os.getenv('SUPABASE_ANON_KEY')
    supabase_secret_key = os.getenv('SUPABASE_SECRET_KEY')
    parser = argparse.ArgumentParser()
    parser.add_argument('--geojson-url', help='', default='https://mdu.axeldraws.com/map.geojson')
    parser.add_argument('--supabase-url', help='Supabase project URL, defaults to env variable', default=supabase_url )
    parser.add_argument('--supabase-anon-key', help='Supabase anon key, defaults to env variable', default=supabase_anon_key )
    parser.add_argument('--supabase-secret-key', help='Supabase secret key, defaults to env variable', default=supabase_secret_key )
    args = parser.parse_args()

    #get geojson data
    geojson_data =  requests.get(args.geojson_url).json()
    rooms = []
    #filter only rooms
    for feature in geojson_data['features']:
        if(feature['properties']['indoor'] =="room"):
            if('name' in feature['properties'].keys()):
                rooms.append(feature)

    room_names_to_add =  set([room['properties']['name'] for room in rooms])
    rooms_to_add = [{'Name': room} for room in room_names_to_add]

    sb_client:Client = create_client(args.supabase_url, args.supabase_secret_key)
    sb_client.table('Rooms').delete().neq('id',1000000).execute()
    sb_client.table('Rooms').insert(rooms_to_add).execute()
