import { Dialog, Switch, Transition } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon, BellIcon, LockClosedIcon, QuestionMarkCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { IKronoxUserAuthResponse } from "kronox-adapter";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import SignInModal from "../../components/signInModal";
import { useUserContext } from "../../context/usercontext";

const UserIndex: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const { getKSession, signOutKronox } = useUserContext();
    const [selectedPane, setSelectedPane] = useState<"profile" | "security" | "notifications" | "help">("profile");
    const [unionNotifications, setUnionNotifications] = useState(false);
    const [signOutInProgress, setSignOutInProgress] = useState(false);
    const [kronoxSession, setKronoxSession] = useState<IKronoxUserAuthResponse | null>(null);
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
    useEffect(() => {
        getKSession().then((session: IKronoxUserAuthResponse) => {
            setKronoxSession(session);
            if((session as any).error) {
                setKronoxSession(null);
            }

        })
    }, [])


    if (user === null && !signOutInProgress) return <div>
        <SignInModal isOpen setIsOpen={() => router.push('/')} />
    </div>
    return (
        <div className="h-full flex flex-col justify-center items-center flex-1 dark:text-white px-20 py-10 ">
            <div className="flex-1 w-full flex">

                <aside className="flex flex-col justify-between px-10 py-5 border-r-white border-r-2 mt-10 mb-10 ">
                    <div className="flex flex-col gap-10">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Settings
                            </h1>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Button onClick={() => setSelectedPane("profile")} buttonStyle={selectedPane === "profile" ? "outlined" : "filled"} className={`w-full flex items-center gap-3 rounded-none `}>
                                <UserIcon className="w-5  text-blue-500" />

                                Profile

                            </Button>
                            <Button onClick={() => setSelectedPane("security")} buttonStyle={selectedPane === "security" ? "outlined" : "filled"} className={`w-full flex items-center gap-3 rounded-none `}>
                                <LockClosedIcon className="w-5 text-green-500" />

                                Security

                            </Button>
                            <Button onClick={() => setSelectedPane("notifications")} buttonStyle={selectedPane === "notifications" ? "outlined" : "filled"} className={`w-full flex items-center gap-3 rounded-none `}>
                                <BellIcon className="w-5 text-red-500" />

                                Notifications

                            </Button>
                            <Button onClick={() => setSelectedPane("help")} buttonStyle={selectedPane === "help" ? "outlined" : "filled"} className={`w-full flex items-center gap-3 rounded-none `}>
                                <QuestionMarkCircleIcon className="w-5 text-yellow-500" />

                                Help

                            </Button>

                        </div>
                    </div>
                    <div>
                        <Button onClick={signOut} buttonStyle="outlined" className="w-full flex items-center gap-3 rounded-none">
                            <ArrowLeftOnRectangleIcon className="w-5" />
                            Sign Out

                        </Button>

                    </div>
                </aside>
                <div className="flex-1 w-full flex justify-center items-center px-10 py-16">
                    {
                        selectedPane === "profile" &&
                        <div className="w-full h-full " >
                                <h1 className="text-2xl mb-10">Profile</h1>
                                <main className="flex flex-col gap-4 ">
                                    <div className="flex flex-col">
                                        <label htmlFor="name">Name</label>
                                        <div>
                                            <input type="text" name="name" id="name" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Email</label>
                                        <label>
                                            {user?.email}
                                        </label>
                                    </div>
                                    <div className="flex flex-col" >
                                        <label>Signed in via</label>
                                        <label>
                                            {user?.app_metadata.provider}
                                        </label>

                                    </div>
                                    <div className="flex flex-col">
                                        <label>
                                            User ID
                                        </label>
                                        <label className="opacity-40">
                                            {user?.id}
                                        </label>
                                    </div>
                                    <div>
                                    <Button buttonStyle="outlined"> 
                                        Save
                                    </Button>
                                    </div>
                                </main>
                        </div>
                    }
                    {
                        selectedPane === "security" &&
                        <div className="w-full h-full " >
                                <h1 className="text-2xl mb-10">Security</h1>
                                <main className="flex flex-col gap-4 "><div>
                                <Button onClick={() => setShowDeleteUserModal(true)} buttonStyle="outlined" className=" items-center gap-3 rounded-none dark:text-red-500 text-red-500 dark:border-red-500 dark:hover:bg-red-500 hover:bg-red-500 border-red-500 ">
                                    Delete Account
                                    </Button>
                                    
                                    
                                </div>
                                    <div className="flex flex-col  mt-10">
                                        <h2 className="text-2xl">Kronox</h2>
                                      { kronoxSession ?  <div className="flex flex-col gap-2 ">
                                            <label>Kronox Session</label>
                                            <label className="opacity-40">
                                                {kronoxSession?.token}
                                            </label>
                                            <label>
                                                Kronox Username
                                            </label>
                                            <label className="opacity-40">
                                                {kronoxSession?.username}
                                            </label>
                                            <label>
                                                Kronox Name
                                            </label>
                                            <label className="opacity-40 mb-4">
                                                {kronoxSession?.name}
                                            </label>
                <div>
                                                <Button buttonStyle="outlined" onClick={() => {
                                                    signOutKronox();
                                                    setKronoxSession(null);
                                                }} className=" items-center gap-3 rounded-none dark:text-red-500 text-red-500 dark:border-red-500 dark:hover:bg-red-500 hover:bg-red-500 border-red-500 ">
                                                Sign Out From Kronox
                                                </Button>
                                                </div>
                                        </div>
                                            : <label>
                                                No Kronox Session
                                        </label>    
                                        }
                                    </div>
                                </main>
                        </div>
                    }
                    {
                        selectedPane === "notifications" &&
                        <div className="w-full h-full " >
                                <h1 className="text-2xl mb-10">Notifications</h1>
                                <main className="flex flex-col gap-4 "><div className="flex gap-4">
                                    <label htmlFor="unionNotifications">Union Events</label>
                                    <Switch
                                        id="unionNotifications"
                                        checked={unionNotifications}
                                        onChange={setUnionNotifications}
                                        className={`${unionNotifications ? 'dark:bg-white bg-black ' : 'dark:bg-black bg-white border-black dark:border-white border-2'
                                            } relative inline-flex h-7 w-11 items-center`}
                                    >
                                        <span className="sr-only">Enable notifications</span>
                                        <span
                                            className={`${unionNotifications ? 'translate-x-6 dark:bg-black bg-white' : 'translate-x-1  dark:bg-white bg-black'
                                                } inline-block h-4 w-4 transform  transition`}
                                        />
                                    </Switch>
                                </div>
                                </main>
                        </div>
                    }
                    {
                        selectedPane === "help" &&
                        <div className="w-full h-full " >
                                <h1 className="text-2xl mb-10">Help</h1>
                                <main className="flex flex-col gap-4 "><div>
                                    <p>
                                        Find help on <a className="underline" href="https://github.com/axdra/Rhea/issues">github</a>
                                    </p>
                                </div>
                                </main>
                        </div>
                    }

                </div>
            </div>

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
