import { createContext, useContext, useEffect, useState } from 'react';
import { IKronoxUserAuthResponse } from 'kronox-adapter';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { getKronoxSession } from '../utils/userutils';
import { Transition } from '@headlessui/react';

interface IUserContext {
    getKSession: any;
    setKSession: any;
    signOutKronox: any;
    clearKSession: any;
}

const UserContext = createContext< IUserContext>({
    getKSession: null,
    setKSession: null,
    signOutKronox: null,
    clearKSession: null,
});

export function RheaUserContext({ children }:any) {
    const [kSession, setKSession] = useState<null | string>(null);
    const { supabaseClient } = useSessionContext();
    const [showKronoxSignInDialog, setShowKronoxSignInDialog] = useState(false);
    const [failedToLogin, setFailedToLogin] = useState(false);
        let signInCallback:((user:IKronoxUserAuthResponse)=>void) | null = null;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const session = window.localStorage.getItem('kronox_session');
        if (session) {
            setKSession(session);
        }
    }, []);


    const login = (username: string, password: string) => {

        supabaseClient.auth.getSession().then((session) => {
            fetch('/api/user/kronoxlogin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${session.data.session?.access_token}`
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })


                }
            ).then((data) => {
                if (data.status === 200) {
                    data.json().then((data) => {
                        setKSession(data.token);
                        setShowKronoxSignInDialog(false);
                        console.debug(signInCallback)
                        if (signInCallback) {
                            
                            signInCallback(data)
                            console.debug(data);
                            signInCallback = null;

                        };
                    })

                }
                else {
                    setKSession(null);
                    setFailedToLogin(true);
                    setLoading(false);

                }
            })

        });
    }
    const handleLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        };
        const username = target.username.value;
        const password = target.password.value;
        login(username, password);
    }



    const signOutKronox = async () => {
        window.localStorage.removeItem('kronox_session');
        const session = await supabaseClient.auth.getSession();
        if (session) {
         const logout = await   fetch('/api/user/kronoxlogout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${session.data.session?.access_token}`
                }
            }
            ).catch((err) => {
                //raise error
                throw err;
            });
        }

        setKSession(null);

    }
    const clearKSession = () => {
        window.localStorage.removeItem('kronox_session');
        setKSession(null);
    }

    useEffect(() => {
        if (kSession) {
            window.localStorage.setItem('kronox_session', kSession);
        }
    }, [kSession]);
    const getKSession = async (showDialogOnFailure: boolean = false, onSignInCompleteCallback?: (user: IKronoxUserAuthResponse) => void ):Promise<IKronoxUserAuthResponse> => {
        console.debug(onSignInCompleteCallback)
        if (onSignInCompleteCallback) signInCallback = onSignInCompleteCallback;
        const session = window.localStorage.getItem('kronox_session');
        let error = null;
        if (session) {
            const res = await fetch('/api/user/kronox', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${session}`
                }

            })
            const data = await res.json();
            if(data.error){
                error = data.error;
            }
            if (data.token) {
                setKSession(data.token);
                return data;
            }
            


        }
        const userSession = await supabaseClient.auth.getSession();
        const res = await fetch('/api/user/kronoxlogin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${userSession.data.session?.access_token}`
            }
        });
        const data = await res.json();
        const kronoxSession = data;
        if (kronoxSession) {
            const res = await fetch('/api/user/kronox', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${kronoxSession}`
                }

            })
            const data = await res.json();
            if (data.error) {
                error = data.error;
            }
            if (data.token) {
                setKSession(data.token);
                return data;
            }
        }
        if (showDialogOnFailure) {
            setShowKronoxSignInDialog(true);
            
        }
        
        return Promise.reject(error);

            


            
    }

  return (
    <UserContext.Provider value={{
        getKSession,
          setKSession,
          signOutKronox,
          clearKSession,
      }}>
          <Transition.Root
              show={showKronoxSignInDialog}
          >
              <Transition.Child className={"fixed bg-black/50 h-screen w-screen z-50 top-0 left-0 flex justify-center items-center"}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  
              >
                  <Transition.Child
                      enter="transition-all duration-1000 ease-in-out transform"
                      enterFrom="opacity-0  translate-x-12  "
                      enterTo="opacity-100  "
                      leave="transition-all duration-300"
                      leaveFrom="opacity-100  "
                      leaveTo="opacity-0 translate-y-4 "
                      className={"bg-white dark:bg-black dark:text-white border-2 dark:border-white rounded-lg shadow-lg p-4  max-w-3xl"}
                      as="div"
                  >
                
                              <h1 className={"text-2xl font-bold"}>Kronox</h1>
                      <p className={"text-gray-500"}>You are required to sign in to kronox to use this feature.</p>
                      <p>By signing in are you agree to the terms of use and privacy policy. You can read more here how we save data from kronox and how it works. </p>
                      <p>We <span className='underline'>DO NOT</span> save any passwords.</p>
                      <form onSubmit={handleLoginForm} className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1">
                              <label className="text-sm" htmlFor="username">Username</label>
                              <input type="text" name="username" onChange={() => setFailedToLogin(false)} className={`${failedToLogin && "border-red-500 dark:border-red-500 dark:placeholder:text-red-500/100"} duration-300 transition-all dark:bg-black dark:border-white dark:text-white rounded-lg dark:placeholder:text-white/50  border-2 `} placeholder="Kronox Username" />

                          </div>
                          <div className="flex flex-col gap-1">
                              <label className="text-sm" htmlFor="password">Password</label>
                              <input type="password" name="password" onChange={() => setFailedToLogin(false)} className={`${failedToLogin && "border-red-500 dark:border-red-500 dark:placeholder:text-red-500/100"} duration-300 transition-all dark:bg-black dark:border-white dark:text-white rounded-lg dark:placeholder:text-white/50  border-2 `} placeholder="Kronox Password" />

                          </div>

                          <input type="submit" value="Sign In" className="mt-2 select-none bg-white border-black border-2 px-6 py-2 text-black rounded-xl hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black dark:border-white cursor-pointer" />
                      </form>

                  </Transition.Child>
              </Transition.Child>
              
                </Transition.Root>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}