import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useUser, useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { FC, Fragment, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface ISignInModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SignInModal: FC<ISignInModalProps> = ({ isOpen, setIsOpen }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { supabaseClient } = useSessionContext();
    const s = useSupabaseClient();
    console.log(s)

    const signInWithGoogle = async () => {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) console.error(error);
    };
    const signInWithGithub = async () => {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "github",
        });
        if (error) console.error(error);
    };

    const signInWithEmail = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const { error, data } = await supabaseClient.auth.signInWithPassword({
            email, password
        });
        if (error) console.error(error);
    };

    const signUpWithEmail = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const { error, data } = await supabaseClient.auth.signUp({
            email, password
        });
        console.log(data)
        if (error) console.error(error);
    };

    const { t } = useTranslation();

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsOpen} >
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black dark:text-white dark:border dark:border-white">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                >
                                    {t('signIn')}
                                </Dialog.Title>


                                <div className="mt-2">
                                    <h2 className="text-center mb-3 text-gray-700">Sign in via a provider</h2>
                                    <div className="flex justify-center gap-4">

                                        {/* <div className="h-16 w-16 bg-black text-white flex justify-center items-center rounded-2xl cursor-pointer"><FaApple className="h-6 w-6" /></div> */}
                                        <div className="h-16 w-16 bg-black dark:border-white dark:border dark:hover:text-black dark:hover:bg-white transition-colors duration-300 text-white flex justify-center items-center rounded-2xl cursor-pointer" onClick={signInWithGoogle}><h1><FaGoogle className="h-6 w-6" /></h1></div>
                                        {/* <div className="h-16 w-16 bg-black text-white flex justify-center items-center rounded-2xl cursor-pointer"><h1><FaMicrosoft className="h-6 w-6" /></h1></div> */}
                                        <div className="h-16 w-16 bg-black dark:border-white dark:border dark:hover:text-black dark:hover:bg-white transition-colors duration-300 text-white flex justify-center items-center rounded-2xl cursor-pointer" onClick={signInWithGithub} ><h1><FaGithub className="h-6 w-6" /></h1></div>
                                    </div>

                                    <div className="w-full h-px bg-gray-200 my-4" />

                                    <h2 className="text-center mb-3 text-gray-700">Or sign in via email</h2>
                                    <div>
                                        <div className="space-y-2">
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type={'email'} placeholder="Email" autoComplete="off" className="form-input block w-full transition ease-in-out duration-150 rounded-full" />
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type={'password'} placeholder="Password" autoComplete="off" className="form-input block w-full transition ease-in-out duration-150 rounded-full" />
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <button onClick={signInWithEmail} className="rounded-full py-2 px-6 bg-orange-500 text-white shadow cursor-pointer hover:bg-orange-600 transition-colors w-full text-center">Sign In</button>
                                            <button onClick={signUpWithEmail} className="rounded-full py-2 px-6 bg-gray-500 text-white shadow cursor-pointer hover:bg-gray-600 transition-colors w-full text-center">Sign Up</button>
                                        </div>
                                    </div>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default SignInModal;