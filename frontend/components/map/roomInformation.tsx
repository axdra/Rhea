import { FC } from "react";

interface IRoomInformationProps {
    roomName: string;

}

enum BookingStatus {
    Free = "Free",
    Booked = "Booked",
    Passed = "Passed",
}

const BookingInformation = [
    {
        startTime: "08:15",
        endTime: "10:00",
        status: BookingStatus.Passed,
        booker: "ods23003",



    },
    {
        startTime: "10:15",
        endTime: "12:00",
        status: BookingStatus.Booked,
        booker: "ods23003",
    },
    {
        startTime: "12:15",
        endTime: "14:00",
        status: BookingStatus.Free,
    },
    {
        startTime: "14:15",
        endTime: "16:00",
        status: BookingStatus.Free,
    },
    {
        startTime: "16:15",
        endTime: "18:00",
        status: BookingStatus.Free,
    },
    {
        startTime: "18:15",
        endTime: "20:00",
        status: BookingStatus.Free,
    },

]
const RoomInformation: FC<IRoomInformationProps> = (props) => {
    console.log(props);
    return (
        <div className="p-5 flex flex-col h-full gap-10">
            <h1 className="text-4xl font-medium ">{props.roomName}</h1>
            <div className="flex flex-col  flex-1 gap-10">
                {BookingInformation.map((booking, index) => {
                    return (
                        <div key={index} className={`flex-1 rounded-xl flex px-4 ${booking.status === BookingStatus.Free && " bg-green-50 border-green-400 hover:bg-green-400 hover:text-green-50 text-green-500 border-2 cursor-pointer"} ${booking.status === BookingStatus.Booked && "bg-red-50 border-red-400 hover:bg-red-400 hover:text-red-50 text-red-500 border-2 cursor-not-allowed"} ${booking.status === BookingStatus.Passed && "bg-neutral-50 border-neutral-400 hover:bg-neutral-400 hover:text-neutral-50 text-neutral-500 border-2"} `}>
                            <div className="flex flex-col  items-center flex-1 justify-center">

                                <div className="flex justify-between w-full">
                                    <h1 className="font-medium">{booking.status}</h1>

                                    <time className="font-medium">
                                        {booking.startTime}
                                    </time>
                                </div>
                                <div className="flex justify-between w-full">
                                    <div className="font-bold" >
                                        {booking.booker}
                                    </div>
                                    <time className="font-medium">
                                        {booking.endTime}
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