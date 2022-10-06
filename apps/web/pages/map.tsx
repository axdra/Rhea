import { NextPage } from "next";
import { useRouter } from "next/router";
import LevelSelector from "../components/map/levelSelector";
import Map, { Source, Layer, PointLike, GeolocateControl } from "react-map-gl";
import { useCallback, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import RoomInformation from "../components/map/roomInformation";
import { Bookings } from "./api/map/rooms";

let MapRef: any = null;
let GeoRef: any = null;
const MapView: NextPage = () => {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState('0');
    const { q } = router.query;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const {t} = useTranslation();
    const [floorPlan, setFloorplan] = useState();
    const [selectedRoom, setSelectedRoom] = useState<any>();
    const [pois, setPois] = useState();
    const [mapData, setMapData] = useState<any>();
    const [roomList, setRoomList] = useState<string[]>();
    const [openSearchBar, setOpenSearchBar] = useState(false);
    const [searchList, setSearchList] = useState<string[]>();
    const [building, setBuilding] = useState<any>();
    const [zoomLevel, setZoomLevel] = useState(18);
    const [bookings, setBookings] = useState<Bookings>()
    const geolocateControlRef = useCallback((ref:any) => {
        if (ref) {
            GeoRef = ref;
            // Activate as soon as the control is loaded
            ref.trigger();

        }
    }, []);

    useEffect(()=>{
        fetch('/api/map/rooms').then(result=>{
            result.json().then((json:Bookings)=>{
                setBookings(json)
            })
        })
    },[setBookings])

    useEffect(() => {
        if (mapData) {

            setFloorplan({ ...mapData, features: mapData.features.filter((feature: any) => feature.properties?.indoor === 'room' && feature.properties.tags.level == selectedLevel) });
            setBuilding({ ...mapData, features: mapData.features.filter((feature: any) => feature.properties?.indoor === 'level' && feature.properties.tags.level == selectedLevel) });
            setPois({ ...mapData, features: mapData.features.filter((feature: any) => feature.properties?.indoor !== 'room') });
            if (selectedRoom && selectedRoom.properties?.tags?.level !== selectedLevel) {

                setSelectedRoom(undefined);
            }
        }
    }, [selectedLevel, mapData]);

    useEffect(() => {
        if (q) {
            if (mapData) {
                mapData.features.filter((feature: any) => feature.properties?.indoor === 'room'  &&  feature.properties.tags.name?.toLowerCase() == (q as string).toLowerCase() ).forEach((feature: any) => {
                    setSelectedRoom(feature);
                    setSelectedLevel(feature.properties.tags.level);
                });
            }
        }
    }, [q, mapData]);

        


    const mapRef = useCallback((map: any) => {
        if (map) {
           
            if (q) {
                if (mapData) {
                    mapData.features.filter((feature: any) => feature.properties?.indoor === 'room' && feature.properties.tags.name?.toLowerCase() ==( q as string).toLowerCase() ).forEach((feature: any) => {
                        map.flyTo({ center: [feature.geometry.coordinates[0][0][0], feature.geometry.coordinates[0][1][1]], zoom: 18});
                    });
                }
            }
            if (!MapRef) {
                MapRef = map;
            
                }
        }
    }, [mapData]);

    useEffect(() => {
        fetch('/map.geojson').then((data) => {
            data.json().then((data) => {
                setRoomList(data.features.filter((feature: any) => feature.properties?.indoor === 'room' && feature.properties.tags.name).map((feature: any) => feature.properties.tags.name));
                setFloorplan({ ...data, features: data.features.filter((feature: any) => feature.properties?.indoor === 'room' && feature.properties.tags.level == selectedLevel) });
                setPois({ ...data, features: data.features.filter((feature: any) => feature.properties?.indoor !== 'room') });
                setMapData(data);

            })
        })
    }, [])


    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true)
        }
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
                const colorScheme = event.matches ? "dark" : "light";
                setDarkMode(colorScheme === 'dark');
                console.log(colorScheme);
            })
    }, [setDarkMode]);

    
    const requestLocation = () => {
        if(GeoRef) {
            GeoRef.trigger();
        }
    }

    return (
        <div className="flex-1 flex flex-col relative">
         

            <Map
                ref={mapRef}
                onZoom={(e) => {
                    setZoomLevel(e.target.getZoom());
                }}
                logoPosition="top-right"
                initialViewState={
                    {
                        latitude: 59.61861227,
                        longitude: 16.54059559,
                        zoom: 18,
                    }
                }
                mapStyle={darkMode ?'mapbox://styles/mapbox/dark-v10' :'mapbox://styles/axdra/cl7lvw83y000c14nwrme20rel'}
                attributionControl={false}
                mapboxAccessToken={accessToken}
                style={{
                    flexGrow: 1,
                    display: 'block',
                }}
                onClick={(e) => {
                    const bbox: PointLike = [e.point.x, e.point.y]

                    // Find features intersecting the bounding box.
                    const selectedFeatures = e.target.queryRenderedFeatures(bbox, {
                        layers: ['rooms']
                    });
                    (selectedFeatures)
                    if (selectedFeatures.length > 0) {
                        setSelectedRoom({
                            type: "FeatureCollection",
                            features: [selectedFeatures.filter((feature: any) => feature.properties?.indoor === 'room')[0]]
                        });

                    }
                    else {
                        setSelectedRoom(undefined);
                    }
                }}
            >
               <GeolocateControl ref={geolocateControlRef} positionOptions={{
                    enableHighAccuracy: true,
                }} trackUserLocation={true} showUserHeading={true} position={'bottom-right'} showAccuracyCircle={false} showUserLocation={true}   />
                <Source type="geojson" data={floorPlan}   >
                    <Layer id="rooms" type="fill" layout={
                        {
                            visibility: zoomLevel > 16 ?  'visible' : 'none'
                        }
                    } paint={
                        
                        {
                            
                            'fill-color': 'rgb(249,115,22)',
                            'fill-opacity': 0.2
                        }
                    }
                        
                    />
                    <Layer  id="rooms-outline" type="line"
                        layout={
                            {
                                visibility: zoomLevel > 16 ? 'visible' : 'none'
                            }
                        }
                        
                        paint={
                        {
                            'line-color': 'rgb(249,115,22)',
                            'line-width': 2,
                            'line-opacity': 0.5
                        }
                    } />
                    <Layer  id="rooms-label" type="symbol" layout={

                        {
                            visibility: zoomLevel > 16 ? 'visible' : 'none',

                            'text-field': '{name}',
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                            'text-offset': [0, 0.6],

                        }
                    } paint={
                        {
                            'text-color': 'rgb(249,115,22)',
                        }
                    } />
                    
                    {/* Render image depending on type of room */}
           
                </Source>
                <Source type="geojson" data={building}   >

                    <Layer id="building" type="fill" paint={
                        {
                            'fill-color': 'rgb(249,115,22)',
                            'fill-opacity': 0.05
                        }
                    } />
                    <Layer id="building-outline" type="line" paint={
                        {
                            'line-color': 'rgb(249,115,22)',
                            'line-width': 2,
                            'line-opacity': 0.5
                        }
                    } />
                    <Layer id="building-label" type="symbol" layout={

                        {
                            'text-field': '{name}',
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                            'text-offset': [0, 0.6],

                        }
                    } paint={
                        {
                            'text-color': 'rgb(249,115,22)',
                        }
                    } />
                </Source>
                {selectedRoom &&
                    <Source type="geojson" data={selectedRoom}   >

                        <Layer id="selected-room" type="fill" paint={
                            {
                                'fill-color': 'rgb(255,5,22)',
                                'fill-opacity': 0.2
                            }
                        } />
                        <Layer id="rooms-outline" type="line" paint={
                            {
                                'line-color': 'rgb(249,115,22)',
                                'line-width': 2,
                                'line-opacity': 0.5
                            }
                        } />
                        <Layer id="rooms-label" type="symbol" layout={

                            {
                                'text-field': '{name}',
                                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                                'text-offset': [0, 0.6],

                            }
                        } paint={
                            {
                                'text-color': 'rgb(249,115,22)',
                            }
                        } />
                    </Source>
                }
            </Map>
            <div className="absolute  h-full w-full pointer-events-none p-3 ">
          
                <div  className={`h-12  w-12 border-2 border-black bg-white rounded-xl flex items-center px-2 ${openSearchBar && "w-64"} transition-all duration-500`}>
                    <MagnifyingGlassIcon onClick={() => setOpenSearchBar(!openSearchBar)} className={`h-6 flex-1 pointer-events-auto cursor-pointer stroke-4 trasntio ${openSearchBar ? " w-0 hidden" : "w-6"}`}   />
                    <input className={`bg-transparent outline-none pointer-events-auto ${openSearchBar ? "block w-full " : "w-0"} transition-all duration-500`} placeholder="Search" />
                    <XMarkIcon className={`h-5 pointer-events-auto ${!openSearchBar ? " w-0 " : "w-5" }`} onClick={() => setOpenSearchBar(!openSearchBar)} />
                </div>
           
                <div className="absolute  bottom-3">
                    <LevelSelector levels={['2', '1', '0']} currentLevel={selectedLevel} onLevelSelect={(level) => setSelectedLevel(level)} />

                </div>
                {selectedRoom && selectedRoom.features &&
                    <div className="md:absolute fixed w-screen h-screen md:left-auto left-0 top-16    md:w-1/3 md:h-full md:min-w-[24rem] md:max-w-3xl   md:right-12 flex md:py-10   md:top-0 z-0">
                            <div className="w-full flex-1 bg-white md:rounded-xl md:border-2 md:border-black  pointer-events-auto dark:bg-black md:dark:border-white dark:border-white dark:text-white"><RoomInformation bookings={bookings} roomName={selectedRoom.features[0].properties.name} />
                            </div>
                    </div>
                    }
            </div>
        </div>
    );
    
}
export async function getStaticProps({ locale }: any) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            // Will be passed to the page component as props
        },
    };
}

export default MapView;