import { Dialog, Transition } from "@headlessui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import SignInModal from "../../components/signInModal";

const UserIndex: NextPage = () => {
    const router = useRouter();
    const {t} = useTranslation();
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [signOutInProgress, setSignOutInProgress] = useState(false);
    const supabaseClient = useSupabaseClient()
    const user = useUser()

    const signOut = async () => {
        setSignOutInProgress(true);
        const { error } = await supabaseClient.auth.signOut();
        if (error) console.error(error);
        if (!error) {
            router.push("/");
        }

    };

    if (user === null && !signOutInProgress) return <div>
        <SignInModal isOpen setIsOpen={()=>router.push('/')}/>
    </div>
    return (
        <div className="h-full flex flex-col justify-center items-center flex-1 dark:text-white">
            <div className="px-4 py-5 rounded-xl border-0 md:border-2 dark:border-white border-black md:py-20 md:px-12 dark:md:border dark:md:border-white">
                <h1 className="mb-2 text-lg  font-medium">{t('user')}</h1>
            <h2>{t('provider')}: {user?.app_metadata.provider}</h2>
                <h2>{t('email')}: {user?.email}</h2>
                <h2>{t('userCreationDate')}: {new Date(user?.created_at!).toLocaleDateString('sv-SE',{
                year: "numeric",
                month: "long",
                day: "numeric",
            })}</h2>
                <div className="flex flex-col gap-2 mt-5">
                   <Button buttonType="link" buttonStyle="outlined" href={'/user/calendar'} >
                    {t('personalCalendar')}
                   </Button>
                   <Button buttonStyle="outlined" onClick={() => setShowDeleteUserModal(true)} className="border-red-500 text-red-500 hover:bg-red-500 dark:hover:bg-red-500/40 dark:hover:text-red-500 dark:text-red-500">
                   {t('deleteMyAccount')}
                   </Button>
                   <Button buttonStyle="filled" onClick={() => signOut()} >
                   {t('signOut')}
                   </Button>
                
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
