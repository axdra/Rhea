import { FC } from "react";
import { IKronoxBookingRoom } from "kronox-adapter";

export interface ITimeViewProps  {
    day: IKronoxBookingRoom[];
    timeSlot: number;
    bookRoom: (room: string) => void;
    

}

const TimeView:FC<ITimeViewProps> = (props: ITimeViewProps) => {
    return (
        <div className="h-full flex w-full flex-col justify-center items-center flex-1 dark:text-white">
            <div className="px-5 flex-wrap max-w-3xl flex gap-2 justify-center    ">
                {props.day.map((room, index) => {
                    if (room.timeSlots[props.timeSlot].isBookable){
                    return (
                     <div onClick={()=>props.bookRoom(room.id)} className=" w-20 aspect-square flex justify-center items-center text-green-500 bg-green-500/10 border border-green-500 hover:bg-green-500 hover:text-green-900 cursor-pointer">{room.id}</div>
                    )
                    }
                    else {
                        return (
                            <div className=" w-20 aspect-square flex justify-center items-center text-red-500 bg-red-500/10 border border-red-500 hover:bg-red-500 hover:text-red-900 cursor-not-allowed">{room.id}</div>
                        )
                    }
                })}
                
                </div>
        </div>
    );
}
export default TimeView;