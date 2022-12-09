import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CampusMap from "../components/map/campusMap";


const MapView: NextPage = () => {

    return (
        <div className="flex-1 flex flex-col relative h-full">
            <CampusMap/>
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