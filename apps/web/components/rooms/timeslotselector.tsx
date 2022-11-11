import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
export interface ITimeSlotSelectorProps{
    days: number[][];
    onSelected: (day: number, timeslot: number) => void;
}
const getTimeSlotColors = (available: number, max: number) => { 
    
    const colors0 = "bg-green-500/20 text-green-500 border-green-500 hover:bg-green-500 hover:text-green-900 cursor-pointer";

    const colors1 = "bg-lime-500/20 text-lime-500 border-lime-500 hover:bg-lime-500 hover:text-lime-900  cursor-pointer";
    const colors2 = "bg-yellow-500/20 text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-yellow-900 cursor-pointer";
    const colors3 = "bg-amber-500/20 text-amber-500 border-amber-500 hover:bg-amber-500 hover:text-amber-900 cursor-pointer";
    const colors4 = "bg-orange-500/20 text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-orange-900 cursor-pointer";
    const colors5 = "bg-red-500/20 text-red-500 border-red-500 hover:bg-red-500 hover:text-red-900 cursor-not-allowed";
    const percentage = (available / max);
    if (percentage === 1) return colors0;
    if ( percentage >= 0.8) {
        return colors1;
    }
    else if (percentage >= 0.6) {
        return colors2;
    }
    else if (percentage >= 0.4) {
        return colors3;
    }
    else if (percentage > 0) {
        return colors4;
    }
    else {
        return colors5;
    }

}
    
const TimeSlotSelector: FC<ITimeSlotSelectorProps> = (props) => {
    const [currentDay, setCurrentDay] = useState(0);
    return (
        <>
    
            <div className="w-full max-w-7xl px-5 md:block hidden  ">

        <div className="grid grid-cols-9 max-w-2xl mx-auto gap-2 ">
            <div/>
            <label className="text-center">
                today
            </label>
            <label className="text-center">
            {new Date(new Date().getTime() + 86400000).toLocaleDateString('sv-SE', { weekday: 'long' })}
            </label>
            <label className="text-center">
            {new Date(new Date().getTime() + 86400000 * 2).toLocaleDateString('sv-SE', { weekday: 'long' })}
            </label>
            <label className="text-center">
            {new Date(new Date().getTime() + 86400000 * 3).toLocaleDateString('sv-SE', { weekday: 'long' })}
            </label>
            {new Date(new Date().getTime() + 86400000 * 4).toLocaleDateString('sv-SE', { weekday: 'long' })}
             <label className="text-center">
            {new Date(new Date().getTime() + 86400000 * 5).toLocaleDateString('sv-SE', { weekday: 'long' })}
            </label>
            <label className="text-center">
            {new Date(new Date().getTime() + 86400000 * 6).toLocaleDateString('sv-SE', { weekday: 'long' })}
            </label> 
            <label className="text-center">
            {new Date(new Date().getTime() + 86400000 * 7).toLocaleDateString('sv-SE', { weekday: 'long' })}
            </label>
            <div className="flex flex-col gap-2">
                <label className="aspect-square flex justify-center items-center text-center">
                    08:15
                    10:00
                </label>
                <label className="aspect-square flex justify-center items-center text-center">
                    10:15
                    12:00
                </label>
                <label className="aspect-square flex justify-center items-center text-center">
                    12:15
                    14:00
                </label>
                <label className="aspect-square flex justify-center items-center text-center">
                    14:15
                    16:00
                </label>
                <label className="aspect-square flex justify-center items-center text-center">
                    16:15
                    18:00
                </label>
                <label className="aspect-square flex justify-center items-center text-center">
                    18:15
                    20:00
                </label>
            </div>
            {props.days.map((day, indexDay) => {
                return (
                    <div key={indexDay} className="flex flex-col gap-2 justify-end" >
                        {day.map((timeslot, indexTimeSlot) => {
                            return (
                                <div key={indexTimeSlot} onClick={() => { if (timeslot) props.onSelected(indexDay, indexTimeSlot) }} className={`${getTimeSlotColors(timeslot, 35)}   aspect-square text-center flex justify-center items-center border transition-colors select-none `}>
                                    {timeslot ? "Free" : "Full"}

                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
            </div>
            <div className="md:hidden block w-full px-5 select-none">
                <div className="flex  justify-evenly gap-2 mb-10 items-center px-4">
                    <div>
                        <ChevronLeftIcon className={`w-6 h-6 dark:text-white text-black ${currentDay === 0 && "opacity-50"}`} onClick={() => { if (currentDay > 0) setCurrentDay(currentDay - 1) }} />
                    </div>
                    {currentDay === 0 ? <div className="text-lg flex-1 text-center">Today</div> : <div className="text-lg flex-1 text-center">{ new Date(new Date().getTime() + 86400000 * currentDay).toLocaleDateString('sv-SE', { weekday: 'long' }) }</div>
                    }
                    <div>
                        <ChevronRightIcon className={`w-6 h-6 dark:text-white  text-black ${currentDay === 7 && "opacity-50"}`} onClick={() => { if (currentDay < 7) setCurrentDay(currentDay +1) }} />
                    </div>
                    </div>
                <div className="grid grid-cols-3 mx-auto gap-2 ">
                    <div className="flex flex-col gap-2 ">
                        <label className="flex justify-center items-center text-center h-24">
                            08:15
                            10:00
                        </label>
                        <label className="flex justify-center items-center text-center h-24">
                            10:15
                            12:00
                        </label>
                        <label className="flex justify-center items-center text-center h-24">
                            12:15
                            14:00
                        </label>
                        <label className="flex justify-center items-center text-center h-24">
                            14:15
                            16:00
                        </label>
                        <label className="flex justify-center items-center text-center h-24">
                            16:15
                            18:00
                        </label>
                        <label className="flex justify-center items-center text-center h-24">
                            18:15
                            20:00
                        </label>
                    </div>
                    <div  className="flex flex-col gap-2 justify-end col-span-2" >
                        {props.days[currentDay].map((timeslot, indexTimeSlot) => {
                            return (
                                <div key={indexTimeSlot} onClick={() => { if (timeslot) props.onSelected(currentDay, indexTimeSlot) }} className={`${getTimeSlotColors(timeslot, 35)}   h-24 text-center flex justify-center items-center border transition-colors select-none `}>
                                    {timeslot ? "Free" : "Full"}

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
        

    )
}


export default TimeSlotSelector