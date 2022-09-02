import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Map from 'react-map-gl';

const MapView: NextPage = () => {
    const router = useRouter();
    const { q } = router.query;
    useEffect(() => {
        if (q) {
            console.log(q);
        }
    } , [q]);
    return (
        <div className="flex-1 flex flex-col">
            <Map
                initialViewState={{
                    latitude: 59.618808,
                    longitude: 16.541037,
                    zoom: 18
                }}
                style={{
                    flexGrow: 1,
                    display: 'block',
                }}
                attributionControl={false}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={"pk.eyJ1IjoiYXhkcmEiLCJhIjoiY2t6dmh2ZmltMDM1NTJvczk1MnI5c2UyMSJ9.HZh3hWr1hpzzdQieKwpKpw"}
            />
        </div>
    );
}
    
export default MapView;