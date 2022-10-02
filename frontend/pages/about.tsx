import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaGithubSquare } from "react-icons/fa";

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
            <div className="fixed top-0 max-h-screen w-screen z-0 overflow-y-auto px-4">
                <a href="#about" className="h-screen z-0 block" />
                <div id="about"  className="min-h-screen bg-white z-20 md:pt-16 dark:bg-black dark:text-white flex justify-center">
                    <div  className="flex flex-col  max-w-7xl w-full mt-32 prose dark:prose-invert">
                        <h1  >{t('about')}</h1>
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
                        <section>
                            <p className="text-sm text-neutral-500">{t('disclaimer')}</p>
                            <a href="https://github.com/axdra/Rhea">
                                <FaGithubSquare className="h-12 w-12 text-black dark:text-white mx-auto" />
                            </a>
                            <label className="text-neutral-300 dark:text-neutral-700">
                                Commit: <a className="text-neutral-400 dark:text-neutral-600" href={`https://github.com/axdra/Rhea/commit/${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || ''}`} >{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "master"}</a>
                            </label>
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