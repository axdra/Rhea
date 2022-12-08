import { IKronoxUserAuthResponse } from "kronox-adapter";
import { NextPage } from "next";

import { useEffect, useState } from "react";
import RoomList from "../../components/rooms/roomlist";
import { useUserContext } from "../../context/usercontext";

const Rooms:NextPage = () => {
    const { getKSession, setKSession } = useUserContext();
    const [user, setUser] = useState<IKronoxUserAuthResponse | null>(null);
    const [bookableRooms, setBookableRooms] = useState<string[]>([]);
    useEffect(() => {
        getKSession(true, (user: IKronoxUserAuthResponse) => {
            setUser(user);
         
        }).then((session: IKronoxUserAuthResponse) => {
            console.debug(session);
            if (!Object.keys(session).includes('error')) {
           setUser(session)
       }
        }).catch((err: any) => {
            console.log(err)
       setUser(null);
   })
   }, [])
    useEffect(() => {
            if (user) {
                fetch('/api/rooms/getBookableRooms?' + new URLSearchParams({
                    'session': encodeURI(user.token),
                    'flik':'FLIK_0001'
                })).then((data) => {
                    data.json().then((data) => {
                        setBookableRooms(data);
                    })
                })
            }
    }, [user])
    const navigateToRoom = (name:string) => {
        window.location.href = `/rooms/${encodeURI(name)}`;
    }


        return <RoomList rooms={bookableRooms} onRoomClick={(name)=>navigateToRoom(name)} />
    
}
export default Rooms;

  

