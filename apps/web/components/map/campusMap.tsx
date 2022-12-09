import { GeolocateControl, Layer, Map, MapboxMap, MapRef, NavigationControl, Source } from "react-map-gl";
import { FC, useCallback, useEffect, useRef } from "react";
import LevelSelector from "./levelSelector";

interface ICampusMapsProps {
    initialRoom?: string;
    initialFloor?: string;
    initialBuilding?: string;
    initialCampus?: string;
    showLevelSelector?: boolean;
    showSearch?: boolean;
    interactable?: boolean;
}    

const CampusMap: FC<ICampusMapsProps> = (props) => {
    props = {
        ...props,
        showLevelSelector: props.showLevelSelector ?? true,
        showSearch: props.showSearch ?? true,
        interactable: props.interactable ?? true
    }
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature', geometry: {
                    type: 'Point', coordinates: [16.5407,59.61864
                        ] } }
        ]
    };
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        new ResizeObserver(() => {
            if (!mapRef.current) return;
            mapRef.current.resize();
            console.log("resize");
        }).observe(containerRef.current)
    }, [containerRef]);

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };
    const mapRef = useRef<MapRef>(null);

    const onMapLoad = useCallback(() => {
        if(!mapRef.current) return;
        mapRef.current.on('zoom', () => {
            // do something
        });
        mapRef.current.on('click', (e) => {
            // do something
            const bbox = [
                [e.point.x - 5, e.point.y - 5],
                [e.point.x + 5, e.point.y + 5]
            ];
            // Find features intersecting the bounding box.
            const selectedFeatures = mapRef.current?.queryRenderedFeatures(bbox as any, {
                layers: ['point']
            });
            // Set a filter matching selected features by FIPS codes
            // to activate the 'counties-highlighted' layer.
        }
        );
        
    }, []);
    
    return <div ref={containerRef} className=" flex-1 flex flex-col h-full min-h-full"  >
        <Map
            ref={mapRef}
            initialViewState={{
                latitude: 59.61864,
                longitude: 16.5407,
                zoom: 17
            }}
            interactive={props.interactable}
            onLoad={onMapLoad}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            style={{ width: "100%", height: "100%",flexGrow:1 }}
            attributionControl={false}
            onResize={() => console.log("RESIZE MAP")}
            mapStyle="mapbox://styles/axdra/cl9sim33d001914nx1ern5miz"
        >
            {/*add rectangle at middle*/}
            <Source id="my-data" type="geojson" data={geojson as any}>
                <Layer {...layerStyle as any} />
            </Source>
            <div className="absolute top-4 left-4">
                {props.showSearch && <input type="text" placeholder="Search" />}
            </div>
            <div className="absolute left-4 bottom-4 block">
                {
                    props.showLevelSelector && 
                
            <LevelSelector levels={["3","2","1","0"]} onLevelSelect={function (level: string): void {
                throw new Error("Function not implemented.");
            } } currentLevel={"0"}/>
                }
            </div>
          </Map>
    </div>
 };

export default CampusMap;