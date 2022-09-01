import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TestMap from "../components/map/testMap";

const Map: NextPage = () => {
    const router = useRouter();
    const { q } = router.query;
    useEffect(() => {
        if (q) {
            console.log(q);
        }
    } , [q]);
    return (
        <div>
            <TestMap selectedRoom={ q} />
        </div>
    );
}
    
export default Map;