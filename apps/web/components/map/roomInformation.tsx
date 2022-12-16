import dayjs from "dayjs";
import { FC } from "react";
import { Bookings } from "../../pages/api/map/rooms";

interface IRoomInformationProps {
    roomName: string;
    bookings?: Bookings;

}

enum BookingStatus {
    Free = "Free",
    Booked = "Booked",
    Passed = "Passed",
    BookedByUser = "BookedByUser"
}


const RoomInformation: FC<IRoomInformationProps> = (props) => {
    const bookings = props.bookings?.days?.find(day=> dayjs(day.date).isSame(new Date(),'day' ))?.rooms.find(room=>room.name.toLowerCase() === props.roomName?.toLowerCase())
    return (
        <div className="p-5 flex flex-col h-full gap-10  ">
            <h1 className="text-4xl font-medium ">{props.roomName}</h1>
            <div className="flex flex-col  flex-1 gap-10  ">
                {bookings?.timeSlots.map((booking, index) => {

                        return (
                        <div key={index} className={`
                        flex-1 rounded-xl flex px-4 
                        ${booking.booker === undefined && new Date(booking.start_time).getTime()  > new Date().getTime() && " bg-green-50 border-green-400 hover:bg-green-400 hover:text-green-50 text-green-500 dark:bg-green-500/50 dark:hover:bg-green-500/60 dark:hover:text-green-500  border-2 cursor-pointer"} 
                        ${(booking.booker?.length ?? 0) > 0 && "bg-red-50 border-red-400 hover:bg-red-400 hover:text-red-50 text-red-500 dark:bg-red-500/50 dark:hover:bg-red-500/60 dark:hover:text-red-500  border-2 cursor-not-allowed"} 
                        ${new Date(booking.end_time).getTime()  < new Date().getTime() && "bg-neutral-50 border-neutral-400 hover:bg-neutral-400 hover:text-neutral-50 text-neutral-500 dark:bg-neutral-500/50 dark:hover:bg-neutral-500/60 dark:hover:text-neutral-500  border-2"} 
                        ${false  && "bg-neutral-50 border-blue-400 hover:bg-blue-400 hover:text-blue-50 text-blue-500 dark:bg-blue-500/50 dark:hover:bg-blue-500/60 dark:hover:text-blue-500 border-2"} 
                        
                        `}>
                            <div className="flex flex-col  items-center flex-1 justify-center">

                                <div className="flex justify-between w-full">
                                    <h1 className="font-medium line-clamp-1">{booking.reason}</h1>

                                    <time className="font-medium">
                                        {new Date(booking.start_time).toLocaleTimeString('sv-SE',{
                                            hour:'2-digit',
                                            minute:'2-digit'
                                        })}
                                    </time>
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="font-bold" >
                                        {booking.booker}
                                    </div>
                                    <time className="font-medium">
                                        {new Date(booking.end_time).toLocaleTimeString('sv-SE',{
                                            hour:'2-digit',
                                            minute:'2-digit'
                                        })}
                                    </time>
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>

        </div>
    )

}
export default RoomInformation;