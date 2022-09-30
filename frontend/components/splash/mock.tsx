import { FC } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import SchedulePreview from "./schedulePreview";
import Link from "next/link";
import UnionEventPreview from "./unionEventPreview";
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
    const unionEventsPreviews = [
        {
            name: "Halloween Party",
            location: "Kårhuset G6",
            creator: "LTD",
            color: "#4B255D",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&dl=aditya-chinchure-ZhQCZjr9fHo-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
            start: "Friday 20:00",
            cost:"50kr"
        },
        {
            name: "Gaming Night",
            location: "Kårhuset G6",
            creator: "DALO",
            color: "#EFD14C",
            image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&dl=aksel-fristrup-w7eaCH6ShR4-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
            start:"Saturday 18:00"
        },
        {
            name: "Study with ALF",
            location: "Kårhuset G6",
            creator: "ALF Västerås",
            color: "#664B44",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&dl=marvin-meyer-SYTO3xs06fU-unsplash.jpg&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
            start: "Monday 17:00"
        },
    ]
    return (
        <div className="flex flex-col items-end justify-center h-full flex-1 select-none ">
            <div className="flex lg:h-[26rem] gap-4 lg:flex-row flex-col">
                <div className="flex-1 flex flex-col gap-4 ">
                    <Link href="/map" className="border-black border-2  rounded-xl flex-1 lg:w-64 w-full  bg-white hover:bg-black  duration-300 group relative overflow-hidden">
                        
                        <Image src="/images/map.jpg" height={130} width={"252"}  quality={"100"} className="absolute z-0 group-hover:opacity-0 transition-opacity duration-300 antialiased" />
                        <h1 className="absolute top-3 left-5 text-lg font-bold group-hover:text-white duration-300">
                            {t("map")}
                        </h1>
                    </Link>
                    <div className="border-black border-2 rounded-xl h-4/6  lg:w-64 w-full bg-white overflow-hidden flex flex-col py-3 px-3">
                        <h1 className=" text-lg font-bold ">
                            {t("schedule")}
                        </h1>
                        <div className="flex flex-col gap-3 flex-1 ">
                        {SchedulePreviews.map((preview, index) => {
                            return <SchedulePreview key={index} {...preview} />
                        })}
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4 h-full">
                    <div className="border-black border-2 rounded-xl flex-1 w-80 bg-white  overflow-hidden flex flex-col py-3 px-3 ">
                        <h1 className=" text-lg font-bold ">
                            {t("unions")}
                        </h1>
                        <div className="flex flex-col gap-3 flex-1 ">
                            {unionEventsPreviews.map((preview, index) => {
                                return <UnionEventPreview key={index} {...preview} />
                            })}
                        
                        </div>
                        </div>
                </div>
       </div>
        </div>
    );
}

export default Mock;
