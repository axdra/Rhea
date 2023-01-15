import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Button from "../../components/Button";


const Group: NextPage = () => {
    const  user  = useUser();
    const { supabaseClient } = useSessionContext();
    const [groups, setGroups]   = useState<any>([]);

    useEffect(() => {
        supabaseClient.auth.getSession().then((session) => {
            fetch('/api/user/groups',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${session.data.session?.access_token ?? ''}`
                    }
                }
            ).then((data) => {
                data.json().then((data) => {
                    setGroups(data);
                })
            });
        });
    }, [user]);
    return (
        <div className=" h-full flex-1 flex flex-col items-center px-5 pt-24">
            <div className="w-full max-w-6xl ">
                <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl  font-bold ">
                    Your Groups
                </h1>
                <Button buttonType="link" buttonStyle={"filled"}  href={`/group/new`}>Create new</Button>

                </div>
            {groups?.map((group: any) => {
                return (<div key={group.id} className="flex mb-2 items-center justify-between w-full border-2 border-black rounded-lg px-4 py-2 shadow">
                    <h2>{group.name}</h2>
                    <Button buttonType="link" buttonStyle={"outlined"} href={`/group/${group.id}`} >Go To Group</Button>
                </div>)
            })}
            <div className="w-full flex justify-center items-center mt-4">
                    <Button buttonType="link" buttonStyle={"outlined"} href={`/group/join`} >Join group</Button>
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

export default Group;