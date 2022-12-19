import { IKronoxUserAuthResponse } from "kronox-adapter";
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useEffect, useState } from "react";
import RoomList from "../../components/rooms/roomlist";
import { useUserContext } from "../../context/usercontext";
import { supabase } from "../../utils/supabaseClient";

const Rooms:NextPage = (props:any) => {
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


    return <div className=" flex justify-center"><RoomList bookableRooms={bookableRooms} onRoomClick={(name) => navigateToRoom(name)} rooms={props.rooms} /></div>
    
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {


    console.log(ctx.query.name);
    const { data } = await supabase.from("rooms").select("*")
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale as string, ["common"])),
            rooms: data
        }
    };
};
export default Rooms;

  

