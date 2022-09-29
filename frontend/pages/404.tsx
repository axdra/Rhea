import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const fourOFour: NextPage = () => { 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();

    return (
        <div className="h-full flex flex-col justify-center items-center flex-1 dark:text-white">
            <h1>{ t('404message')}</h1>
            <Link href="/" className="hover:underline text-orange-500">
                {t('404goBack')}
            </Link>
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
export default fourOFour;