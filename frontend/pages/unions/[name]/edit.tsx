import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Edit: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();

    return (
        <div className="h-full flex flex-col justify-center items-center flex-1 dark:text-white">
           
        </div>
    );
}

export default Edit;