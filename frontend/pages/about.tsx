import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const fourOFour: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();
    return (
        <div className="h-full flex flex-col justify-center items-center flex-1 px-4 text-center gap-1">
            <p>{t('createdBy')} <a className="text-orange-500 hover:underline hover:text-orange-600" href="https://axeldraws.com">Axel Draws</a></p>
            <p>{t('withHelpFrom')} <a className="text-orange-500 hover:underline hover:text-orange-600" href="https://linkedin.com/in/oskar-sturebrand-aa73b7219">Oskar Sturebrand</a> {t('creatingMap')}.</p>
            <p>{t('disclaimer')}</p>
            <p><a href="https://github.com/axdra/Rhea" className="text-orange-500 hover:underline hover:text-orange-600">GitHub</a></p>
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