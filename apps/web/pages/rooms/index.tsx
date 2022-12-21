import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { IKronoxUserAuthResponse } from "kronox-adapter";
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Fragment, useEffect, useState } from "react";
import RoomList from "../../components/rooms/roomlist";
import { useUserContext } from "../../context/usercontext";
import { supabase } from "../../utils/supabaseClient";

const Rooms: NextPage = (props: any) => {
    const { getKSession, setKSession } = useUserContext();
    const [user, setUser] = useState<IKronoxUserAuthResponse | null>(null);
    const [bookableRooms, setBookableRooms] = useState<string[]>([]);
    const [search, setSearch] = useState<string>();
    const [roomTypeFilter, setRoomTypeFilter] = useState<string[]>([]);
    const [roomCapacityFilter, setRoomCapacityFilter] = useState<number>(0);
    const [bookableRoomsFiltered, setBookableRoomsFiltered] = useState<boolean>(false);
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
                'flik': 'FLIK_0001'
            })).then((data) => {
                data.json().then((data) => {
                    setBookableRooms(data);
                })
            })
        }
    }, [user])
    const navigateToRoom = (name: string) => {
        window.location.href = `/rooms/${encodeURI(name)}`;
    }


    return <div className="container mx-auto md:mt-12 mt-4 md:px-24 px-8 py-10 rounded-lg mb-24 flex-1 dark:text-white ">
        <div className="flex gap-5 items-center flex-wrap justify-center">    <input
            autoComplete="off"
            value={search}
            placeholder={"Search"}
            onChange={(e) => setSearch(e.target.value)}
            className=" form-input w-full md:w-auto rounded-xl border-2 border-black dark:border-white dark:bg-black bg-white text-black dark:text-white"
        />
            <Listbox value={roomTypeFilter} onChange={setRoomTypeFilter} multiple>
                <div className="relative h-full w-56">
                    <Listbox.Button className="form-input h-full rounded-xl w-full border-2 border-black dark:border-white dark:bg-black bg-white text-black dark:text-white">
                        <span className="block truncate text-left">Room type</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl border-2 border-black dark:border-white dark:bg-black bg-white text-black dark:text-white">
                            {Array.from(new Set(props.rooms.map((room: any) => {
                                if (room.room_type == null) {
                                    return "No room type"
                                }
                                return room.room_type
                            }))).map((room: any) => room).map((person: any, personIdx: any) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'dark:bg-white dark:text-black' : ''
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white">
                                                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            <div className="flex flex-col items-center justify-between h-full gap-2">
                <label className="flex items-center">
                    {"Min Size: "}
                    {roomCapacityFilter}
                </label>
            <input type="range" value={roomCapacityFilter} min={0} max={256} onChange={(e)=>setRoomCapacityFilter(Number.parseInt(e.currentTarget.value))} className="w-56 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-white">
            </input>
            </div>
            <div className="flex flex-col items-center justify-between h-full">
                <label className="flex items-center">
                    {"Bookable"}
                </label>
            <input type="checkbox" checked={bookableRoomsFiltered} onChange={(e)=>setBookableRoomsFiltered(e.currentTarget.checked)} className="w-4 h-4 bg-gray-200 rounded appearance-none cursor-pointer dark:bg-white">
            </input>
            </div>



        </div>
        <h1 className="mt-4 text-2xl font-medium mb-5 xl:w-[72rem] transition-all  ">
            {"Rooms"}
        </h1>

        <RoomList bookableRoomsFiltered={bookableRoomsFiltered} nameFilter={search} roomCapacityFilter={roomCapacityFilter} roomTypeFilter={roomTypeFilter} bookableRooms={bookableRooms} onRoomClick={(name) => navigateToRoom(name)} rooms={props.rooms} /></div>

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



