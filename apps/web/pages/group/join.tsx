import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import JoinCodeInput from "../../components/group/JoinCodeInput";


const GroupJoin: NextPage = () => {
    const router = useRouter()
    const { q } = router.query
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const  user  = useUser();
    const { supabaseClient } = useSessionContext();
    const [groups, setGroups]   = useState<any>([]);
    useEffect(() => {
        if(q){
        supabaseClient.auth.getSession().then((session) => {
            fetch('/api/group/join',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${session.data.session?.access_token ?? ''}`
                    },
                    body: JSON.stringify({
                        inviteCode: q
                    })

                }
            ).then((data) => {
                
                if(data.status === 200){
                    router.push(`/group`)
                }
            
            });
        });
        }
    }, [user,q]);
    if(q){
      
        return <div>OK</div>
    }
    return (
        <div className=" h-full flex-1 flex flex-col items-center justify-center gap-2">
        <h1 className="text-lg  font-bold">
            Enter a join code
        </h1>
        <JoinCodeInput code={code} onCodeChange={setCode} />
        <Button buttonType="button" buttonStyle={"filled"}  onClick={() => {router.push(`/group/join?q=${code.join("")}`)}}>Join</Button>
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

export default GroupJoin;