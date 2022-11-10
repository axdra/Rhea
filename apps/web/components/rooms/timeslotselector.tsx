import { FC } from "react";

export interface ITimeSlotSelectorProps{
    days: boolean[][];
    onSelected: (day: number, timeslot: number) => void;
}

const TimeSlotSelector: FC<ITimeSlotSelectorProps> = (props) => {
    return (
        <div className="w-full max-w-7xl px-5   ">

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
                                <div key={indexTimeSlot} onClick={()=>{if(timeslot)props.onSelected(indexDay,indexTimeSlot)}} className={`${timeslot ?" bg-green-500/20 text-green-500 border-green-500 hover:bg-green-500 hover:text-green-900  cursor-pointer" :"bg-orange-500/20 text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-orange-900 cursor-not-allowed"}  aspect-square text-center flex justify-center items-center border transition-colors select-none `}>
                                    {timeslot ? "Free" : "Fully Booked"}

                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
        </div>
    )
}


export default TimeSlotSelector