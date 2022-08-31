import { Dialog, Transition } from "@headlessui/react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import SearchBar from "./searchBar";

const Header: FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [signInPrompt, setSignInPrompt] = useState(false)
    const signIn = () => {
        supabase.auth.signInWithOAuth({ provider: 'github' }).then(() => {
            console.log('signed in')
        }).catch(err => {
            console.log(err)
        }
        )
    }

    const signOut = () => {
        supabase.auth.signOut().then(() => {
            console.log('signed out')
            setUser(null)
        }).catch(err => {
            console.log(err)
        }
        )
    }
    const signInWithEmail = (e:FormEvent) => {
        
        e.preventDefault()
        
    }


    useEffect(() => {
        supabase.auth.getUser().then(user => {
            setUser(user.data.user);
        }).catch(err => {
            console.log(err)
        }
        )
    }, [])
    

    return (
        <>
        <div className="sticky top-0 bg-white h-16 shadow-sm flex justify-between items-center px-10">
                <Link href="/"><a ><h1>MDU Schema</h1></a></Link>
            <div className="flex gap-4">
            <SearchBar/>
            <button className="rounded-full py-2 px-6 bg-orange-500 text-white shadow cursor-pointer hover:bg-orange-600 transition-colors  " onClick={() => setSignInPrompt(true)}>Sign In</button>
            </div>
            </div>

            <Transition appear show={signInPrompt} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setSignInPrompt}>
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Sign In
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <h2 className="text-center mb-3 text-gray-700">Sign in via a provider</h2>
                                        <div className="flex justify-center gap-4">
                                            
                                            <div className="h-16 w-16 bg-black text-white flex justify-center items-center rounded-2xl cursor-pointer"><h1>A</h1></div>
                                            <div className="h-16 w-16 bg-blue-500 text-white flex justify-center items-center rounded-2xl cursor-pointer"><h1>G</h1></div>
                                            <div className="h-16 w-16 bg-green-500 text-white flex justify-center items-center rounded-2xl cursor-pointer"><h1>M</h1></div>
                                            <div className="h-16 w-16 bg-black text-white flex justify-center items-center rounded-2xl cursor-pointer" onClick={signIn}><h1>G</h1></div>
                                        </div>
                                        <div className="w-full h-px bg-gray-200 mt-10"></div>
                                        <h2 className="text-center mb-3 text-gray-700 mt-10">Or sign in via email</h2>
                                        <form className="flex justify-center flex-col items-center gap-4" onSubmit={signInWithEmail}>
                                            <div className="flex flex-col ">
                                                <input id="email" type={'email'} placeholder="Email" className="form-input block w-full transition ease-in-out duration-150 rounded-full" />
                                            </div>
                                            <div className="flex flex-col ">
                                                <input id="password" type={'password'} placeholder="Password" className="form-input block w-full transition ease-in-out duration-150 rounded-full" />
                                            </div>
                                                <input type={'submit'} className="rounded-full py-2 px-6 bg-orange-500 text-white shadow cursor-pointer hover:bg-orange-600 transition-colors  " value="Sign In" />
                                        </form>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
};
        
export default Header;