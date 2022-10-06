import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  createBrowserSupabaseClient,
  createServerSupabaseClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../types.gen";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import LoadingButton from "../../../components/LoadingButton";
import { useState } from "react";

type Union = Database["public"]["Tables"]["unions"]["Row"];
type UpdateUnion = Database["public"]["Tables"]["unions"]["Update"];

type Props = {
  union: Union | null;
};

const Edit: NextPage<Props> = ({ union }) => {
  const { t } = useTranslation();
  const [loading, setIsLoading] = useState(false)

  const supabaseClient: SupabaseClient<Database> = useSupabaseClient();

  const { register, handleSubmit } = useForm<UpdateUnion>({
    mode: "onBlur",
  });

  const onSubmitHandler = async (unionData: UpdateUnion) => {
    setIsLoading(false)
    const cover_image = (unionData.cover_image as unknown as FileList)?.[0];
    if (cover_image) {
      const fileName = `${unionData.name}.jpg`;
      const { data } = await supabaseClient.storage
        .from("unions")
        .upload(fileName, cover_image, {
          upsert: true,
        });
      const { data: publicUrlData } = supabaseClient.storage
        .from("unions")
        .getPublicUrl(fileName);
      unionData.cover_image = publicUrlData.publicUrl;
    }

    await supabaseClient
      .from("unions")
      .update(unionData)
      .eq("name", union?.name);

    setIsLoading(false)
  };

  return (
    <div className="mt-8 container mx-auto">
      <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">
        {t("edit")} {union?.name}
      </h3>
      <form className="mt-4" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white dark:bg-slate-800 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              {/* Name */}
              <div className="col-span-6">
                <label
                  htmlFor="union-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="union-name"
                  className="mt-1 block w-full rounded-md dark:bg-slate-900 border-gray-300 dark:border-slate-600 dark:placeholder-slate-100 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={union?.name}
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>

              {/* Description */}
              <div className="col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  {t("description")}
                </label>
                <textarea
                  rows={3}
                  id="description"
                  className="mt-1 block w-full rounded-md dark:bg-slate-900 border-gray-300 dark:border-slate-600 dark:placeholder-slate-100 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={union?.description ?? undefined}
                  {...register("description")}
                />
              </div>

              {/* Cover image URL */}
              <div className="col-span-6">
                <label
                  htmlFor="cover_image"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-300"
                >
                  {t("cover-image")}
                </label>
                <input
                  type="file"
                  id="cover_image"
                  className="mt-1 block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-slate-50 file:text-slate-700
                  hover:file:bg-slate-100"
                  {...register("cover_image")}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 text-right sm:px-6">
            <LoadingButton loading={loading} type="submit" buttonStyle="filled">
              Update
            </LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = withPageAuth({
  async getServerSideProps(ctx) {
    const { data } = await createServerSupabaseClient<Database>(ctx)
      .from("unions")
      .select("*")
      .ilike("name", ctx.query.name as string);
    return {
      props: {
        union: data?.[0] ?? null,
        ...(await serverSideTranslations(ctx.locale ?? "en", ["common"])),
      },
    };
  },
});

export default Edit;
