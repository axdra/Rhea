import { FC } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import SchedulePreview from "./schedulePreview";
import Link from "next/link";
const Mock: FC = () => {
    const { t } = useTranslation();
    const SchedulePreviews = [
        {
            name: "DVA117 - Lab 6",
            room: "Zeta",
            end: "12:00",
            start: "08:15"
        },
        {
            name: "DVA134 - Compilers",
            room: "Paros",
            end: "15:00",
            start: "13:15"

        },
        {
            name: "DVA117 - Seminar",
            room: "Alfa",
            end: "17:00",
            start: "13:15"
        },
    ]
    return (
        <div className="flex flex-col items-end justify-center h-full flex-1">
            <div className="flex h-[28rem] gap-4">
                <div className="flex-1 flex flex-col gap-4">
                    <Link href="/map" className="border-black border-2  rounded-xl flex-1 w-64 bg-white hover:bg-black  duration-300 group relative overflow-hidden">
                        
                        <Image src="/images/map.jpg" layout="fill" objectFit="cover"  quality={100} className="absolute z-0 group-hover:opacity-0 transition-opacity duration-300 antialiased" />
                        <h1 className="absolute top-3 left-5 text-lg font-bold group-hover:text-white duration-300">
                            {t("map")}
                        </h1>
                    </Link>
                    <div className="border-black border-2 rounded-xl h-4/6 w-64 bg-white relative overflow-hidden">
                        <h1 className="absolute top-3 left-5 text-lg font-bold">
                            {t("schedule")}
                        </h1>
                        <div className="mt-12 flex flex-col gap-3 px-3">
                        {SchedulePreviews.map((preview, index) => {
                            return <SchedulePreview key={index} {...preview} />
                        })}
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="border-black border-2 rounded-xl flex-1 w-64 bg-white relative overflow-hidden">
                        <h1 className="absolute top-3 left-5 text-lg font-bold">
                            {t("unions")}
                        </h1>
                
                        
                        </div>
                </div>
       </div>
        </div>
    );
}

export default Mock;
