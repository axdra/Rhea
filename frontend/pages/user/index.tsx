import { Dialog, Transition } from "@headlessui/react";
import { User } from "@supabase/supabase-js";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import SignInModal from "../../components/signInModal";
import { supabase } from "../../utils/supabaseClient";

const UserIndex: NextPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    useEffect(() => {
        supabase.auth.getUser().then((user) => setUser(user.data.user)).finally(() =>  setLoading(false));
    }, []);
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
        if (!error) {
            //refresh window
            router.push("/");
            setUser(null);
        }

    };

    if (loading) return <div></div>
    if (loading === false && user === null) return <div>
        <SignInModal isOpen setIsOpen={()=>router.push('/')}/>
    </div>
    return (
        <div className="h-full flex flex-col justify-center items-center flex-1">
            <div className="px-4 py-5 md:rounded-lg md:shadow-lg md:py-20 md:px-12">
                <h1 className="mb-2 text-lg text-orange-500 font-medium">{t('user')}</h1>
            <h2>{t('provider')}: {user?.app_metadata.provider}</h2>
                <h2>{t('email')}: {user?.email}</h2>
                <h2>{t('userCreationDate')}: {new Date(user?.created_at!).toLocaleDateString('sv-SE',{
                year: "numeric",
                month: "long",
                day: "numeric",
            })}</h2>
                <div className="flex flex-col gap-2">
                    <Link><a className="bg-orange-500 text-white rounded-full shadow-lg px-4 py-2 mt-4" href="/user/calendar">{t('deleteMyAccount')}</a></Link>
                    <button className="bg-red-500 text-white rounded-full shadow-lg px-4 py-2 mt-4" onClick={() => setShowDeleteUserModal(true)}>{t('deleteMyAccount')}</button>
                    <button className="bg-white text-red-500 rounded-full shadow-lg px-4 py-2 mt-4" onClick={() => signOut()}>{t('signOut')}</button>
                
                </div><h2 className="mt-5 text-gray-300">User ID: {user?.id}</h2>

            </div>
            <Transition appear show={showDeleteUserModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowDeleteUserModal} >
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

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"

                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-red-500"
                                    >
                                        {t('deleteMyAccount')}
                                    </Dialog.Title>


                                    <div className="mt-2">
                                        {/* <h2 className="text-center mb-3 text-gray-700">Sign in via a provider</h2> */}
                                        <div className="flex flex-col gap-3">
                                            <p>
                                                {t('deleteMyAccountMessage1')}

                                            </p>
                                            <p>
                                                {t('deleteMyAccountMessage2')}
                                            </p>
                                        </div>
                                        <div className="flex justify-end gap-4">
                                            <button className="bg-red-500 text-white rounded-full shadow-lg px-4 py-2 mt-4" >
                                                {t('deleteMyAccount')}

                                            </button>
                                            <button className="bg-white text-black rounded-full shadow-lg px-4 py-2 mt-4" onClick={() => setShowDeleteUserModal(false)}>
                                                {t('cancel')}
                                            </button>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            // Will be passed to the page component as props
        },
    };
}
export default UserIndex;
