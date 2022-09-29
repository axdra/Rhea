import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { withPageAuth, User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Fragment, useState } from "react";
import SignInModal from "./signInModal";

export default function UserProfileDropDown() {
    const { t } = useTranslation();

    const [signInPrompt, setSignInPrompt] = useState(false)

    const user = useUser()
    const supabaseClient = useSupabaseClient()

    const signOut = async () => {
        await supabaseClient.auth.signOut();
    };

    if (user) {
        return (
            <Menu as="div" className="relative h-full z-80">
                <div>
                    <Menu.Button className="rounded-full py-2 px-6 bg-orange-500 text-white shadow cursor-pointer hover:bg-orange-600 transition-colors flex items-center h-full">
                        <span className="flex items-center">  {t('user')}
                            <ChevronDownIcon
                                className="ml-2 -mr-1 h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                        </span>

                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"

                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y dark:bg-black dark:border dark:border-white divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  z-80">
                        <div className="px-1 py-1 z-80">
                            <Menu.Item>
                                {({ active }) => (
                                    (<Link
                                        href={'/user/calendar'}
                                        className=" group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-orange-500 hover:text-white">
                                        {t('personalCalendar')}

                                    </Link>)
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    (<Link
                                        href={'/user'}
                                        className=" group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-orange-500 hover:text-white">
                                        {t('userSettings')}

                                    </Link>)
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-orange-500 hover:text-white" onClick={signOut}>
                                    {t('signOut')}
                                </button>
                            </Menu.Item>
                        </div>

                    </Menu.Items>
                </Transition>
            </Menu >
        );
    }
    return (
        <div>
            <button className="rounded-full py-2 px-6 bg-orange-500 text-white shadow cursor-pointer hover:bg-orange-600 transition-colors block  " onClick={() => setSignInPrompt(true)}>{t('signIn')}</button>
            <SignInModal isOpen={signInPrompt} setIsOpen={setSignInPrompt} />

        </div>

    )
}