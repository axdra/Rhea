import { Dialog, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { IKronoxBookingRoom, IKronoxUserAuthResponse } from "kronox-adapter";
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import CampusMap from "../../components/map/campusMap";
import RoomFeature from "../../components/rooms/roomFeature";
import TimeSlotSelector from "../../components/rooms/timeslotselector";
import { useUserContext } from "../../context/usercontext";
import { supabase } from "../../utils/supabaseClient";

interface Props {
  room: string;
  roomInfo: {
    name: string;
    roomType?: string;
    building?: string;
    capacity: number;
    features?: string[];
  }
}

const getTimeSlotsForRoom = (days: IKronoxBookingRoom[][], roomName:string):number[][] => {
  const name = roomName.toLowerCase();
  const timeslots:number[][] = [];
days.forEach(element => {
  const room = element.find((room) => room.id.toLowerCase() === name);
  if(room){
    
  timeslots.push( room?.timeSlots.map((slot) => {
    return slot.isBookable ? 1 : 0;
  }
  )
  )
}
});
   console.table(timeslots);
  
  return timeslots;
}
    


const Room: NextPage<Props> = (props) => {
  const { getKSession, setKSession } = useUserContext();
  const [user, setUser] = useState<IKronoxUserAuthResponse | null>(null);
  const [bookableRooms, setBookableRooms] = useState<string[]>([]);
  const [days, setDays] = useState<IKronoxBookingRoom[][]>([]);

  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [fetchingBookable, setFetchingBookable] = useState<boolean>(true);
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
      const requests = [];
      for (let index = 0; index < 8; index++) {
          const date = new Date().setDate(new Date().getDate() + index);
          requests.push( fetch('/api/rooms/getRooms?'+ new URLSearchParams({
              'flik': "FLIK_0001",
              'datum': new Date(date).getFullYear().toString().slice(-2) + "-" + (new Date(date).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(date).getDate().toString().padStart(2, '0'),
              'session': encodeURI(user?.token) ?? ""
          })));
      }
      Promise.all(requests).then((data) => {
          Promise.all(data.map((d) => d.json())).then((data) => {
              setDays(data);
          })
      }
      ).finally(() => {
        setFetchingBookable(false);
      })
    }
  }, [user])
  return <><div className="w-full h-full flex-1 pt-20 md:pt-0 grid gap-20 md:gap-4   md:grid-cols-2 grid-cols-1">
    <div className="col-span-1 text-black dark:text-white flex flex-col justify-center items-center ">
      {
        props.roomInfo.name && <>
          <div className="text-6xl text-center">
            {props.roomInfo.name}

          </div>
          <div className="w-full">
            <div className="text-2xl text-center">
              {props.roomInfo?.roomType}
            </div>
            <div className="text-xl text-center">
              {props.roomInfo?.building}
            </div>
            <div className="text-xl flex  items-center justify-center gap-2">
              <UserIcon className="h-4 w-4" />  {props.roomInfo?.capacity}
            </div>
            <div className={`text-2xl grid mt-6 gap-4 mx-auto w-4/5  ${props.roomInfo?.features?.length! > 1 ? "sm:grid-cols-2" : " justify-center "} `}>
              {props.roomInfo?.features?.map((feature, index) => {
                return <RoomFeature key={index} feature={feature} />
              })

              }
            </div>
            <div className="flex justify-center mt-4" >
              <Button onClick={() => setShowBookingModal(true)} className="w-64 flex justify-center" buttonStyle={"outlined"} loading={fetchingBookable} disabled={!bookableRooms.includes(props.roomInfo.name) || days.length == 0}>
                {bookableRooms.includes(props.roomInfo.name) ? "Book" : "Not bookable"}
              </Button>
            </div>
          </div>
        </>
      }

    </div>

    <CampusMap interactable={false} showLevelSelector={false} showSearch={false} initialRoom={props.room} />
  </div>
    <Transition appear show={showBookingModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setShowBookingModal} >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto flex w-full">
          <div className="flex min-h-full w-full flex-1 items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              

            >
              <Dialog.Panel className=" flex items-center flex-col   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all dark:bg-black dark:text-white dark:border dark:border-white border-black border-2">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Book room {props.roomInfo.name}
                </Dialog.Title>

                <TimeSlotSelector
                notAvailableLabel="Booked"
                availableLabel="Book"
                roomCount={1}
                  onSelected={function (day: number, timeslot: number): void {
                    const date = new Date().setDate(new Date().getDate() + day);
                    const dateString =new Date(date).getFullYear().toString().slice(-2) + "-" + (new Date(date).getMonth() + 1).toString().padStart(2, '0') + "-" + new Date(date).getDate().toString().padStart(2, '0');

                    fetch('/api/rooms/bookRoom?'+ new URLSearchParams({
                      'flik': "FLIK_0001",
                      'datum': dateString,
                      'session': encodeURI(user?.token??'') ?? "" ,
                      'room': props.roomInfo.name,
                      'timeSlot': timeslot.toString()
                  })).then((data) => {
                    if(data.ok){
                      setShowBookingModal(false);
                      days[day]!.find((slot)=>slot.id == props.roomInfo.name)!.timeSlots[timeslot].isBookable = false;
                    }



                  }
                  );
                  }} days={getTimeSlotsForRoom(days,props.roomInfo.name)} />

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>

  </>
}

export default Room;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {


  console.log(ctx.query.name);
  const { data } = await supabase.from("rooms").select("*").ilike("name", (ctx.query.name as string).toLowerCase()).single()
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ["common"])),
      room: ctx.query.name,
      roomInfo: {
        name: data?.name || null,
        roomType: data?.room_type || null,
        building: data?.building || null,
        capacity: data?.capacity || null,
        features: data?.features || null,

      },
    }
  };
};