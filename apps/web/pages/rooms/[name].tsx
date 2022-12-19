import { UserIcon } from "@heroicons/react/24/solid";
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CampusMap from "../../components/map/campusMap";
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
const Room:NextPage<Props> = (props) => {

  return <div className="w-full h-full flex-1 pt-20 md:pt-0 grid gap-20 md:gap-4   md:grid-cols-2 grid-cols-1">
    <div className="col-span-1 text-black dark:text-white flex flex-col justify-center items-center ">
      {
        props.roomInfo.name &&<>
      <div className="text-6xl text-center">
            {props.roomInfo.name}
        
      </div>
      <div>
        <div className="text-2xl text-center">
          {props.roomInfo?.roomType}
        </div>
        <div className="text-xl text-center">
          {props.roomInfo?.building}
        </div>
        <div className="text-xl flex  items-center justify-center gap-2">
        <UserIcon className="h-4 w-4"/>  {props.roomInfo?.capacity}
        </div>
            <div className="text-2xl grid sm:grid-cols-2 mt-6 gap-4 ">
              {props.roomInfo?.features?.map((feature, index) => {
                return <div key={index}>{feature}</div>
              })
                
        }
          </div>
  
      </div>
        </>
      }

      </div>
    
    <CampusMap interactable={false} showLevelSelector={false} showSearch={false} initialRoom={props.room} />
    </div>
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