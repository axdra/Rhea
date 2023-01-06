
import { Battery0Icon, ComputerDesktopIcon, PresentationChartLineIcon, SpeakerWaveIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import React, { FC } from 'react';
import { TbEar } from 'react-icons/tb';
interface IRoomFeatureProps {
    feature: string;
}
const features = [
    "Dator",
    "Projektor",
    "Whiteboard",
    "Hörslinga",
    "Dokumentkamera",
    "Zoomdator",
    "Högtalare"
]

const RoomFeatureIcon = (feature: string) => {
    switch (feature) {
        case "Dator":
            return <ComputerDesktopIcon className="h-5 w-5 " />
        case "Projektor":
            

            return <Battery0Icon className="h-5 w-5 " />
        case "Whiteboard":
            
            return <PresentationChartLineIcon className="h-5 w-5 " />
        case "Hörslinga":
            
            return <TbEar className="h-5 w-5 " />
        case "Dokumentkamera":
            return <VideoCameraIcon className="h-5 w-5 " />
        case "Zoomdator":
            return <ComputerDesktopIcon className="h-5 w-5 " />
        case "Högtalare":
            return <SpeakerWaveIcon className="h-5 w-5 " />
        default:
            return <div className='h-5 w-5'></div>
    }
}

const RoomFeature: FC<IRoomFeatureProps> = (props) => {
    return <div className="overflow-hidden flex items-center gap-2">
        {RoomFeatureIcon(props.feature)}
        {props.feature}</div>
}
export default RoomFeature;