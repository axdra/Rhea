import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Database } from "../../../../types.gen";
import CampusMap from "../../components/map/campusMap";

type Event = Database["public"]["Tables"]["events"]["Row"];

type Props = {
  event?: Event;
};

const Event: NextPage<Props> = ({ event }) => {
  const { t } = useTranslation();
  
  const className=event?.location ?"md:grid-cols-2 grid-cols-1" : "grid-cols-1"
  return <div className={`w-full h-full flex-1 pt-20 md:pt-0 grid gap-20 md:gap-4 ${className}`}>
  <div className="col-span-1 text-black dark:text-white flex flex-col justify-center items-center ">

    <div className="text-3xl text-center">
    {event?.name}
      
    </div>
    <div className="w-full">
      <div className="text-2xl text-center">
      {event?.parent_calendar}
      </div>
      <div className="text-xl text-center">
      {event?.location}
      </div>
      <div className="text-sm text-center">
      {event?.teacher?.split(' ').join(', ')}
      </div>
      <h3 className="text-center">
        {new Date(event?.start_time ||'').toLocaleDateString("sv-SE", {
            weekday: "long",
            month: "long",
            day: "numeric",
        })}
      </h3>
        <h3 className="text-center">
            {new Date(event?.start_time ||'').toLocaleTimeString("sv-SE", {
                hour: "numeric",
                minute: "numeric",
            })}
       {" - "} 
            {new Date(event?.end_time ||'').toLocaleTimeString("sv-SE", {
                hour: "numeric",
                minute: "numeric",
            })}
        </h3>
        
       
    </div>
     

    </div>
  {
    event?.location &&
  <CampusMap interactable={false} showLevelSelector={false} showSearch={false} initialRoom={event?.location} />

}
</div>


};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { data: event } = await createServerSupabaseClient<Database>(ctx)
    .from("events")
    .select("*")
    .ilike("id", ctx.query.id as string)
    .single();


  return {
    props: {
      event: event ?? null,
     
      ...(await serverSideTranslations(ctx.locale as string, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Event;
