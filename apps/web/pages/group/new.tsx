import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


const NewGroup: NextPage = () => {
    const { supabaseClient } = useSessionContext();

    const createGroup = (e: any) => {
        e.preventDefault();
        supabaseClient.auth.getSession().then((session) => {
            fetch('/api/group',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${session.data.session?.access_token ?? ''}`
                    },
                    body: JSON.stringify({
                        name: e.target[0].value
                    })
                }
            ).then((data) => {
                data.json().then((data) => {
                    console.log(data);
                })
            });
        });
    }



    return (
        <div className=" h-full flex-1 flex items-center px-6 pt-24 flex-col">
            <div className="w-full max-w-sm">
                <form onSubmit={createGroup}>
                    <h1 className="text-2xl mb-2">Create new group</h1>
                    <div className="flex flex-col mb-5">
                        <label className="mb-1 text-lg font-medium">
                            Name
                        </label>
                        <input placeholder="Name" type={"text"} required={true} className="rounded-xl border-black border-2" />
                    </div>
                    <input type="submit" value="Submit" className="bg-black text-white w-full h-12 rounded-xl" />
                </form>
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

export default NewGroup;