import { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react";
import { IKronoxRoom } from "kronox-adapter";
import Button from "../Button";

interface IRoomListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rooms: any;
    bookableRooms: IKronoxRoom[] | string[];
    onRoomClick?: (name: string) => void;
    
}


const RoomList: FC<IRoomListProps> = (props) => {
    const { bookableRooms, rooms } = props;
    
    return (
        <div  className={`flex flex-wrap max-w-2xl w-full gap-2 text-white  mt-20 mb-20  ${props.className?? ''}`}>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="text-left">
                            Namn
                        </th>
                        <th className="text-left">
                            Kapacitet
                        </th>
                        <th className="text-left">
                            Typ
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                    
                </thead>
                <tbody className="w-full ">
                {rooms.map((room: any) => {
                return (
                    <tr className="w-full ">
                        <td className="py-2">
                            {room.name}
                        </td>
                        <td >
                           {room.capacity}
                        </td>
                        <td >
                            {room.room_type}
                        </td>
                        <td >
                            {bookableRooms.includes(room.name) && <Button buttonStyle="link" className="text-green-500" onClick={() => props.onRoomClick?.(room.name)}>Boka</Button>}
                        </td>

                    </tr>    
                );
                })}
                </tbody>
            </table>
        </div>
    )

}
export default RoomList;