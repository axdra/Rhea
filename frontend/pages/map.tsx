import { addIndoorTo, IndoorControl, IndoorMap, MapboxMapWithIndoor } from "map-gl-indoor";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Map } from 'mapbox-gl';
import LevelSelector from "../components/map/levelSelector";

const MapView: NextPage = () => {
    const router = useRouter();
    
    const { q } = router.query;
    const accessToken = "pk.eyJ1IjoiYXhkcmEiLCJhIjoiY2t6dmh2ZmltMDM1NTJvczk1MnI5c2UyMSJ9.HZh3hWr1hpzzdQieKwpKpw";
    const mapRef = useCallback((node:HTMLDivElement) => {
        if (!node) return;
        const map = new Map({
            accessToken,
            container: node,
            style: 'mapbox://styles/axdra/cl7lvw83y000c14nwrme20rel',
            
            
        }) as MapboxMapWithIndoor;

        // Create the indoor logic behind the map.indoor property
        addIndoorTo(map);

        // Retrieve the geojson from the path and add the map
        fetch('/test1.geojson').then(res => res.json()).then(data => {

            const indoorMap = IndoorMap.fromGeojson(data);
            map.indoor.addMap(indoorMap);

            // Add the specific control
            map.addControl(new IndoorControl());
            map.on('indoor.map.clicked', (e) => {
                console.log(e)
            })
        })
    }
, []);
    useEffect(() => {
        if (q) {
            console.log(q);
        }
    }, [q]);




    const [selectedLevel, setSelectedLevel] = useState<string>("0");
    return (
        <div className="flex-1 flex flex-col relative">
            <div className=" absolute z-50  top-20 flex justify-center w-full px-10">
                <div className=" py-5 px-5 bg-white  rounded-lg shadow-md ">
                    <h1>
                        This feature is still in development, right now it only shows a map of the campus with no functionality or rooms
                    </h1>
                </div>
            </div>
            {
                <div ref={mapRef} className="h-full flex-1"></div>
            }
            <div className="absolute  h-full w-full pointer-events-none p-3">
                <input type="text" className="bg-white border  text-orange pointer-events-auto rounded-full shadow-md shadow-neutral-400/10 px-5 focus:ring-orange-500  focus:border-orange-500 border-gray-200 " placeholder="Search Room" />
                <div className="absolute  bottom-3">
                    <LevelSelector levels={['2', '1', '0']} currentLevel={selectedLevel} onLevelSelect={(level) => setSelectedLevel(level)} />
                </div>

            </div>
        </div>
    );
}

export default MapView;