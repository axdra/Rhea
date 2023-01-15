import { Dialog, Transition } from "@headlessui/react";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import GroupInvite from "../../components/group/GroupInvite";


const GroupPage: NextPage = () => {
    const  user  = useUser();
    const { supabaseClient } = useSessionContext();
    const [group, setGroup]   = useState<any>();
    const [loading, setLoading] = useState(true);
    const [showInvite, setShowInvite] = useState(false);
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        supabaseClient.auth.getSession().then((session) => {
            fetch('/api/group?'+
                new URLSearchParams({
                    groupid: id as string
                    }).toString(),
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${session.data.session?.access_token ?? ''}`
                    }
                }
            ).then((data) => {
                data.json().then((data) => {
                    setGroup(data);
                })
            }).finally(() => {
                setLoading(false);
            });
        });
    }, [user]);
    return (
        <div className=" h-full flex-1 flex flex-col w-full px-6 items-center pt-20">
            {group?.name && <div className="w-full max-w-6xl">

                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl  font-bold ">
                        {group.name}
                    </h1>
                    <Button buttonType="button" buttonStyle={"filled"}  onClick={() => {setShowInvite(true)}}>Invite</Button>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Members</h2>
                    {group.members.map((member: any) => {
                        return (<div key={member} className="flex mb-2 items-center justify-between w-full border-2 border-black rounded-lg px-4 py-2 shadow">
                            <h2>{member}</h2>
                        </div>)
                    })}
                </div>

                </div>}
            {!group?.name && !loading && <div className="flex-1 flex items-center justify-center">
                <h1 className="text-2xl font-bold">Group not found</h1>
            </div>}

        <Transition appear show={showInvite} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setShowInvite} >
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all dark:bg-black dark:text-white dark:border dark:border-white border-black border-2">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                >
                                 Invite
                                </Dialog.Title>


                                <div className="mt-2 text-gray-700 dark:text-gray-100">
                                    <GroupInvite code={group?.invitecode} />

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


export default GroupPage;