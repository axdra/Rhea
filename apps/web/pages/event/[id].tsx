import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Database } from "../../../../types.gen";

type Event = Database["public"]["Tables"]["events"]["Row"];

type Props = {
  event?: Event;
};

const Event: NextPage<Props> = ({ event }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl  w-full mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow rounded-lg mb-24 flex-1 flex flex-col  dark:text-white text-black  ">
      <h1 className="text-4xl font-medium mb-5 xl:w-[72rem] transition-all  ">
        {event?.name}
      </h1>
        <h2>
            {event?.parent_calendar}
        </h2>
      <Link href={'/map?q='.concat(event?.location ||'')}>
        {event?.location}
      </Link>
      <h3>
        {new Date(event?.start_time ||'').toLocaleDateString("sv-SE", {
            weekday: "long",
            month: "long",
            day: "numeric",
        })}
      </h3>
        <h3>
            {new Date(event?.start_time ||'').toLocaleTimeString("sv-SE", {
                hour: "numeric",
                minute: "numeric",
            })}
        </h3>
        <h3>
            {new Date(event?.end_time ||'').toLocaleTimeString("sv-SE", {
                hour: "numeric",
                minute: "numeric",
            })}
        </h3>
        
      
    </div>
  );
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
