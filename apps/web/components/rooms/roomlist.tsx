import { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react";
import { IKronoxRoom } from "kronox-adapter";
import Button from "../Button";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";

interface IRoomListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rooms: any;
    bookableRooms: IKronoxRoom[] | string[];
    onRoomClick?: (name: string) => void;
    roomTypeFilter?: string[];
    roomCapacityFilter?: number;
    nameFilter?: string;
    bookableRoomsFiltered?: boolean;
}


const RoomList: FC<IRoomListProps> = (props) => {
    const { bookableRooms, rooms,roomCapacityFilter,roomTypeFilter,nameFilter } = props;
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 flex-wrap">

                {rooms?.map((room:any)=>{
                        if((room.capacity >= (roomCapacityFilter??0)) && (roomTypeFilter?.length == 0 || roomTypeFilter?.includes(room.room_type)) && (nameFilter == undefined || room.name.toLowerCase().includes(nameFilter.toLowerCase())) && (!props.bookableRoomsFiltered || bookableRooms?.includes(room.name))){
                        return <Link key={room.name} href={'/rooms/'+room.name} className=" dark:text-white items-center rounded-xl dark:border-white border-black border-2 px-5 py-4 h-24 justify-between flex flex-row hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white duration-300 ">
                           <div> <h1 className="line-clamp-1">{room.name}</h1>
                            <h2 className="text-sm text-neutral-500">{room.room_type}</h2>
                            {room.capacity > 0&&
                            <span className="flex text-sm items-center gap-2">
                                <UserIcon className="h-3 w-3"/>
                                {room.capacity}
                            </span>
                }
                </div>
                <div>
                {bookableRooms?.includes(room.name) && <div className="text-green-500">Bookable</div>}
                </div>
                        </Link>
                        }
                       

                    })}
        </div>
    )

}
export default RoomList;