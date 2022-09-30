import { FC } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
interface ISchedulePreviewProps { 
    name: string;
    room: string;
    end: string;
    start: string;

}
const SchedulePreview: FC<ISchedulePreviewProps> = (props) => {
    const {name, room, end, start} = props;
    const { t } = useTranslation();
    return (
        <div className="flex justify-between bg-neutral-100 px-4 py-2 rounded-xl text-sm">
            <div className="flex flex-col">
                <h1 className=" font-medium">
                    {name}
                </h1>
                <h3 className="text-sm font-medium mt-2">
                    {room}
                </h3>
            </div>
            <div className="flex flex-col">
                <h3>
                    {start}
                </h3>
                <h3 className="text-sm font-medium mt-2">
                    {end}
                </h3>
            </div>

        </div>
    );
}

export default SchedulePreview;
