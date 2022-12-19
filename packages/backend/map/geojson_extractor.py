#get path from arg

import argparse
import json


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--geojson-path', help='Path to geojson file', required=True)
    
    args = parser.parse_args()
    path = args.geojson_path

    #read geojson file
    with open(path) as f:
        data = json.load(f)
    
    #filter only rooms
    rooms = []
    for feature in data['features']:
        if('properties' in feature.keys()):
            if('indoor' in feature['properties'].keys()):
                if(feature['properties']['indoor'] =="room" or feature['properties']['indoor'] =="level"):
                    rooms.append(feature)
    
    output = {
        "type": "FeatureCollection",
        "features": rooms
    }
    #write to file
    with open('rooms.geojson', 'w') as f:
        json.dump(output, f)

    