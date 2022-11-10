import { createContext, useContext, useEffect, useState } from 'react';
import { IKronoxUserAuthResponse } from '../utils/src/types/user';

interface IUserContext {
    getKSession: any;
    setKSession: any;

}

const UserContext = createContext< IUserContext>({
    getKSession: null,
    setKSession: null
});

export function RheaUserContext({ children }:any) {
  const [kSession, setKSession] = useState<null | string>(null);
    useEffect(() => {
        const session = window.localStorage.getItem('kronox_session');
        if (session) {
            setKSession(session);
        }
    }, []);

    useEffect(() => {
        if (kSession) {
            window.localStorage.setItem('kronox_session', kSession);
        }
    }, [kSession]);
    const getKSession = ():Promise<IKronoxUserAuthResponse> => {
       
        const session = window.localStorage.getItem('kronox_session');
        if (session) {
            setKSession(session);
        }
        return fetch('/api/user/kronox',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${session}`
            }

        }).then((data) => {
            return data.json().then((data) => {

                return data;
            })
        }
        ).catch((err) => {
            //raise error
            
            throw err;
        });


            
    }

  return (
    <UserContext.Provider value={{
        getKSession,
        setKSession,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}