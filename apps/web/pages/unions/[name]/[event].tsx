import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//@ts-ignore
import ReactMarkdown from "react-markdown";
import { IUnion, IUnionEvent } from ".";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../types.gen";

type Union = Database["public"]["Tables"]["unions"]["Row"];
type UnionEvent = Database["public"]["Tables"]["unionevents"]["Row"];

type Props = {
  union?: Union;
  event?: UnionEvent;
};

const Union: NextPage<Props> = ({ union, event }) => {
  const [going, setGoing] = useState(false);
  const [interested, setInterested] = useState(false);
  const { t } = useTranslation();

  if (!event) {
    return (
      <div className="h-full flex flex-col flex-1 items-center justify-center text-black">
        <h1 className="text-4xl font-bold">Event not found</h1>
        <Link href={`/unions/${union?.name}`}>
          <a className="text-black-500 ">
            Go back to {union?.name}
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className="h-full flex  flex-1 justify-center dark:text-white pt-10 gap-5 relative">
      <img
        src={event?.cover_image ?? ""}
        alt="background image"
        className="select-none absolute top-0 left-0 w-full opacity-10 h-full cover  object-cover -z-20"
      />
      <div className="absolute top-0 left-0 h-full w-full  bg-gradient-to-t  to-white/50 from-white -z-10" />

      <div className="max-w-6xl px-10 w-full flex gap-10 flex-col-reverse md:flex-row  ">
        <div className="prose flex-1 relative dark:prose-invert">
          <h1>{event?.title}</h1>
          <ReactMarkdown>{event?.description || ""}</ReactMarkdown>
        </div>
        <div>
          <div className="shadow-md rounded-md flex flex-col w-full md:w-72 px-4 py-6 prose bg-white dark:bg-black  dark:border dark:border-white dark:prose-invert ">
            <h3>{t("eventInfo")}</h3>
            {event?.start_time && (
              <p className="mt-1 mb-1">
                <>
                  {t("when")}:{" "}
                  {new Date(event?.start_time).toLocaleDateString("sv-SE", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </>
              </p>
            )}
            {event?.start_time && (
              <p className="mt-1 mb-1">
                <>
                  {t("start")}:{" "}
                  {new Date(event?.start_time).toLocaleTimeString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </>
              </p>
            )}
            {event?.end_time && (
              <p className="mt-1 mb-1">
                <>
                  {t("end")}:{" "}
                  {new Date(event?.end_time).toLocaleTimeString("sv-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </>
              </p>
            )}
            {event?.coordinates ? (
              <p className="mt-2 mb-2">
                {t("where")}:{" "}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${event?.coordinates}`}
                >
                  {event?.location}
                </a>
              </p>
            ) : (
              <p className="mt-2 mb-2">
                {t("where")}: {event?.location}
              </p>
            )}

            {event?.cost && (
              <p className="mt-2 mb-2">
                Cost: <span className="font-bold">{event?.cost}</span> kr
              </p>
            )}
            <div className="flex gap-2 justify-between">
              <div
                className={`text-center flex-1 border select-none border-green-500 bg-green-500/10  rounded-md px-4 py-2 text-green-900 dark:text-green-500 font-bold hover:bg-green-500/50 transition-all cursor-pointer duration-500 ${interested &&
                  "bg-green-500 text-white/100 dark:text-white/100"
                  }`}
                onClick={() => setInterested(!interested)}
              >
                {t("interested")}
              </div>
              <div
                className={`text-center flex-1 border select-none border-blue-500 bg-blue-500/10  rounded-md px-4 py-2 text-blue-900 dark:text-blue-500 font-bold hover:bg-blue-500/50 transition-all cursor-pointer duration-500 ${going && "bg-blue-500 text-white/100 dark:text-white/100"
                  }`}
                onClick={() => setGoing(!going)}
              >
                {t("going")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//For some reason this breaks Vercel build atm after migration to turbo repo
export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  const supabaseClient = createBrowserSupabaseClient<Database>();

  const { data: union } = await supabaseClient
    .from("unions")
    .select("*")
    .ilike("name", ctx.query.name as string)
    .single();
  const { data: event } = await supabaseClient
    .from("unionevents")
    .select("*")
    .ilike("url_slug", ctx.query.event as string)
    .single();
  
  return {
    props: {
      union,
      event,
      ...(await serverSideTranslations(ctx.locale as string, ["common"])),
    },
  };
};

export default Union;
