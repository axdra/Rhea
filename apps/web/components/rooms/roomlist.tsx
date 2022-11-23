import { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react";
import { useUserContext } from "../../context/usercontext";
import { IKronoxRoom } from "kronox-adapter";

interface IRoomListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rooms: IKronoxRoom[] | string[];
    onRoomClick?: (name:string) => void;
}


const RoomList: FC<IRoomListProps> = (props) => {
    const { rooms } = props;

    return (
        <div {...props} className={`flex flex-wrap max-w-lg gap-2 ${props.className}`}>
            {rooms.map((room) => {
                return (
                    <div onClick={() => props.onRoomClick!((typeof room === "string") ? room : room.id)} className="  dark:bg-white/20 flex-1 min-w-[4.5rem] dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black bg-black/20 text-black border-black cursor-pointer    aspect-square text-center flex justify-center items-center border-2 rounded-lg font-medium hover:font-bold transition-colors select-none">
                        {typeof room === "string" ? room : room.id}
                    </div>
                );
            })}
        </div>
    )

}
export default RoomList;