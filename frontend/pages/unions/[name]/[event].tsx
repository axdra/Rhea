import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



const Union: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const eventName = router.query.event as string
    const name = router.query.name as string
    useEffect(() => {
        if (eventName) {
         
        }
    }, [eventName]);
    return (
        <div className="h-full flex flex-1 justify-center dark:text-white mt-10 gap-5">
            <div className="prose max-w-6xl px-10 w-full">
                {name}
                {eventName}
            </div>
        </div>
    );
}


export default Union;