import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const fourOFour: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();
    return (
    <>
        <div className="h-full flex flex-col justify-center items-center flex-1 px-4 text-center gap-1 dark:text-white fixed w-screen">
                <h1 className="text-[25vw]">Rhea.</h1>
                <a href="#about" className="z-10">
                    <ChevronDownIcon className="h-8 w-8 animate-bounce" />
                </a>
        </div>
            <div className="fixed top-0 max-h-screen w-screen z-0 overflow-y-auto">
                <div className="h-screen z-0"></div>
                <div className="min-h-screen bg-white z-20 pt-16 dark:bg-black dark:text-white flex justify-center">
                    <div className="flex flex-col  max-w-7xl w-full mt-32 prose dark:prose-invert">
                        <h1 id="about" >{t('about')}</h1>
                        <p>{t('aboutText')}</p>
                        <section>
                            <h2>{t('contributors')}</h2>
                            <ul className="list-none">
                                <li>
                                    <a href="https://axeldraws.com" target="_blank" rel="noreferrer">
                                        Axel Draws
                                    </a>
                                </li>
                                <li>
                                    <a href="https://atholin.se" target="_blank" rel="noreferrer">
                                        Alexander Andersson Tholin
                                    </a>
                                </li>
                                <li>
                                    <a href="" target="_blank" rel="noreferrer">
                                        Oskar Sturebrand
                                    </a>
                                </li>
                            </ul>
                            
                        </section>

                    </div>
                </div>
    </div>
        </>
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