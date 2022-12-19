import { Transition } from "@headlessui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext, NextPage } from "next";
import { useTranslation, WithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useState } from "react";
import SignInModal from "../../components/signInModal";
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
    const { t } = useTranslation();
    const user = useUser();
    const { supabaseClient } = useSessionContext();
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<null | string>();
    const [success, setSuccess] = useState(false);
    const submitUnion = async (e: any) => {
        setSubmitting(true);
        setError(null);
        setSuccess(false);
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const color = e.target.color.value;
        const cover_image = e.target.cover_image.files[0];
        const formData = new FormData();
        const userSession = await supabaseClient.auth.getSession();
        if (!userSession) {
            setShowSignInModal(true);
            return;
        }

        formData.append("name", name);
        formData.append("description", description);
        formData.append("color", color);
        formData.append("cover_image", cover_image);

        const res = await fetch("/api/unions", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `${userSession.data.session?.access_token}`
            }
        });
        if (res.status === 200) {
            setSuccess(true);
        }
        if (res.status === 401) {
            setShowSignInModal(true);
        }

        if (res.status === 500 || res.status === 400) {
            setError("Something went wrong");
        }
        setSubmitting(false);


    };

    return (
        <>
            <div className="h-full flex flex-col items-center mt-24 flex-1 dark:text-white">
                <div className="flex flex-col max-w-5xl w-full gap-5 px-4">
                    <h1 className="text-4xl">
                        Creating a union
                    </h1>
                    <Transition
                        show={success}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0 "
                        enterTo="opacity-100 "
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className={`absolute top-0 left-0 right-0 z-50 h-screen w-screen bg-black/50 flex flex-col items-center justify-center`}

                        afterEnter={() => setTimeout(() => {
                            setSuccess(false)
                            setTimeout(() => {
                                window.location.href = "/unions"
                            }, 400)
                        }, 3000)}

                    >
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex flex-col" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline">Union request submitted, you will be notified when it is approved!</span>
                        </div>
                    </Transition>

                    {
                        error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  flex flex-col" role="alert">
                                <strong className="font-bold">Error!</strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )
                    }
                    {user && (
                        <>
                            <form className="prose flex flex-col gap-6" onSubmit={submitUnion} >
                                <div className="flex flex-col gap-1">
                                    <label className="dark:text-white" htmlFor="name">Name</label>
                                    <input required type="text" name="name" id="name" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="dark:text-white" htmlFor="description">Description</label>
                                    <textarea required name="description" id="description" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="dark:text-white" htmlFor="color">Color</label>
                                    <input required type="color" name="color" id="color" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="dark:text-white" htmlFor="cover_image">Cover image</label>
                                    <input required className="dark:text-white" type="file" name="cover_image" id="cover_image" />
                                </div>
                                <button className="dark:text-white px-10 py-2  bg-blue-500" type="submit" disabled={submitting}>Create</button>

                            </form>
                        </>)}
                    {
                        !user && (<p>
                            To create a union, you need to <button className="underline" onClick={() => setShowSignInModal(true)}>sign in</button>.
                        </p>)
                    }
                </div>
            </div>
            <SignInModal isOpen={showSignInModal} setIsOpen={setShowSignInModal} />
        </>
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
