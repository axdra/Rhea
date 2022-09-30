import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation, WithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
interface IUnions {
  name: string;
  description: string;
  id: string;
  cover_image: string;
  color: string;
}

type Props = {
  unions: IUnions[];
};

const UnionsList: NextPage<Props & WithTranslation> = ({ unions }) => {
  return (
    <div className="h-full flex flex-col items-center mt-24 flex-1 dark:text-white">
      <div className="grid gird-cols-1 sm:grid-cols-2 xl:grid-cols-3 flex-wrap max-w-5xl w-full gap-5 px-4">
        {unions?.map((union) => {
          return (
            <Link
              href={`/unions/${union.name.toLowerCase()}`}
              key={union.id}
              className="flex flex-col justify-center items-center gap-2 dark:bg-black dark:border dark:border-white bg-white shadow rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className="w-full flex justify-center items-center py-2 relative overflow-hidden "
                style={{
                  backgroundColor: union.color,
                }}
              >
                {union.cover_image ? (
                  <img
                    src={union.cover_image}
                    alt="union cover image"
                    className="h-40 w-64   object-contain group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <div className="h-40 w-64 bg-black"></div>
                )}

                <div className="absolute h-16 bg-gradient-to-t from-black/40 to-transparent w-full bottom-0 z-0" />
                <h1 className="text-bold text-xl absolute left-2 bottom-2 text-white z-10">
                  {union.name}
                </h1>
              </div>
              <div className="flex gap-2 flex-col text-center px-4  pt-2 h-24">
                <p className="line-clamp-3">{union.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { data } = await createServerSupabaseClient(ctx)
    .from("unions")
    .select("*");
  return {
    props: {
      unions: data,
      ...(await serverSideTranslations(ctx.locale ?? "en", ["common"])),
    },
  };
}

export default UnionsList;
