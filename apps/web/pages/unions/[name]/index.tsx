import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database, Json } from "../../../../../types.gen";

export interface IUnionSideBar {
  items: {
    name: string;
    url: string;
  }[];
}

export interface IUnionPage {
  sidebar: IUnionSideBar;
  id: string;
}

export interface IUnionEvent {
  id: number;
  created_at: Date;
  creator: string;
  title: string;
  cover_image: string;
  description: string;
  short_description: string;
  url_slug: string;
  start_time: Date;
  end_time: Date;
  location: string;
  coordinates: string;
  interested?: any;
  going?: any;
  cost: number;
  union: string;
}

export interface IUnion {
  name: string;
  id: string;
  cover_image: string;
  description: string;
  color: string;
  unionpage: IUnionPage[];
  unionevents: IUnionEvent[];
}

type Union = Database["public"]["Tables"]["unions"]["Row"];
type UnionPage = Database["public"]["Tables"]["unionpage"]["Row"];
type UnionEvent = Database["public"]["Tables"]["unionevents"]["Row"];

type Props = {
  union?: Union;
  unionPage?: UnionPage;
  events?: UnionEvent[];
};

const Union: NextPage<Props> = ({ union, unionPage, events }) => {
  const { t } = useTranslation();

  const user = useUser();

  const isAdmin = user?.id && union?.admins.includes(user?.id);

  const sidebar = unionPage?.sidebar as { [key: string]: Json };

  return (
    <div className="h-full flex flex-1 sm:flex-row flex-col  justify-center dark:text-white mt-10 gap-5">
      <div className=" prose max-w-6xl px-10 w-full relative dark:prose-invert ">
        <img
          src={union?.cover_image ?? ""}
          alt={union?.name}
          className="select-none absolute  -z-50 -left-20 -top-32 opacity-5 "
        />

        <div className="flex items-center gap-4 mb-4">
          <h1 className="mb-0">{union?.name}</h1>
          {isAdmin && (
            <Link
              href="/unions/[name]/edit"
              as={`/unions/${union?.name.toLowerCase()}/edit`}
              className="no-underline rounded-md px-6 py-1 border hover:opacity-80"
              style={{
                backgroundColor: union?.color + "30",
                borderColor: union?.color ?? "",
              }}
            >
              {t("edit")}
            </Link>
          )}
        </div>
        <p>{union?.description}</p>
        <div className="flex items-center gap-4 mb-10 mt-10">
          <h2 className="mb-0 mt-0">{t("unionEvents")}</h2>
          {isAdmin && (
            <Link
              href="/unions/[name]/new-event"
              as={`/unions/${union?.name.toLowerCase()}/new-event`}
              className="no-underline rounded-md px-6 py-1 border  hover:opacity-80"
              style={{
                backgroundColor: union?.color + "30",
                borderColor: union?.color ?? "",
              }}
            >
              {t("newEvent")}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
          {events?.map((event) => {
            return (
              <Link
                key={event.id}
                href={`/unions/${union?.name.toLowerCase()}/${event.url_slug}`}
                className="aspect-square w-full shadow-lg relative overflow-hidden rounded-lg transition-all hover:shadow-lg group"
              >
                <img
                  className="absolute  w-full  aspect-square object-cover top-0 mt-0"
                  src={event.cover_image ?? ""}
                  alt={event.title ?? ""}
                />
                <div className="absolute top-2 left-2  bg-white text-black rounded px-2 py-1 group-hover:-top-24 transition-all duration-700 ease-in-out  ">
                  <div>
                    {event?.start_time &&
                      new Date(event?.start_time).toLocaleDateString()}
                  </div>

                  <div>
                    {event?.start_time &&
                      new Date(event.start_time).toLocaleTimeString("sv-SE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </div>
                </div>
                <div className="top-2 right-2 absolute group-hover:-top-24 transition-all duration-700 ease-in-out ">
                  {(event?.cost ?? 0) > 0 ? (
                    <div className=" text-green-600 px-3  border-2  rounded-full border-green-400 bg-green-200 ">
                      {event.cost} kr
                    </div>
                  ) : (
                    <div className="text-green-600 px-3  border-2  rounded-full border-green-400 bg-green-200 ">
                      {t("free")}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 w-full bg-black bg-opacity-70 px-2 py-3 h-2/5 group-hover:h-full transition-all duration-500 ease-in-out ">
                  <h3 className="text-white mt-0 mb-1">{event.title}</h3>
                  <p className="text-white mb-1 line-clamp-2">
                    {event.short_description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-64">
        <h2 className="text-lg text-bold">{t("unionSidebar")}</h2>
        {(
          sidebar?.items as {
            name: string;
            url: string;
          }[]
        )?.map((page) => {
          return (
            <Link key={page.name} href={`${page.url}`}>
              <h3>{page.name}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
  query,
}: GetServerSidePropsContext) => {
  const supabaseClient = createBrowserSupabaseClient<Database>();

  const { data: union } = await supabaseClient
    .from("unions")
    .select("*, unionevents(*)")
    .ilike("name", query.name as string)
    .single();
  const { data: unionPage } = await supabaseClient
    .from("unionpage")
    .select("*")
    .eq("id", union?.id)
    .single();
  const events = union?.unionevents as UnionEvent[]

 
  return {
    props: {
      union,
      unionPage: unionPage ,
      events,
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

export default Union;
