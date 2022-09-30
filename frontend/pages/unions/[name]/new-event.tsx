import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const PostEditor = dynamic(() => import('../../../components/postEditor'), { ssr: false });

const NewEvent: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const name = router.query.name as string
    const { t } = useTranslation();

    return (
        <div className="min-h-full flex flex-col   items-center flex-1 dark:text-white">
        <PostEditor/>
        </div>
    );
}

export default NewEvent;