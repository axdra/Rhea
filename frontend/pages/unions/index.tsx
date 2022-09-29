import { NextPage } from "next";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
interface IUnions{
    name: string;
    description: string;
    id: string;
    cover_image: string;
    color: string;
}

const UnionsList: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();
    const [unions, setUnions] = useState<IUnions[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("/api/unions")
            .then((res) => res.json())
            .then((data) => {
                
                setUnions(data.unions);
            }).finally(() => setLoading(false));
    }, []);
    if (loading) {
        return <div className="h-full flex flex-1 items-center justify-center">
            <svg className="animate-spin  h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

        </div>
    }
    return (
        <div className="h-full flex flex-col items-center mt-24 flex-1 dark:text-white">
            <div className="grid gird-cols-1 sm:grid-cols-2 xl:grid-cols-3 flex-wrap max-w-5xl w-full gap-5 px-4">
            {
                unions?.map((union) => {
                    return (
                        <Link href={`/unions/${union.name.toLowerCase()}`} key={union.id}>
                            <a className="flex flex-col justify-center items-center gap-2 dark:bg-black dark:border dark:border-white bg-white shadow rounded-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                <div
                                    className="w-full flex justify-center items-center py-2 relative overflow-hidden "
                                    style={{
                                        backgroundColor: union.color,
                                    }} >
                                    {
                                        union.cover_image ? <img src={union.cover_image} alt="union cover image" className="h-40 w-64   object-contain group-hover:scale-105 transition-all duration-300" /> : <div className="h-40 w-64 bg-black"></div>
                                }
                                    
                                    <div className="absolute h-16 bg-gradient-to-t from-black/40 to-transparent w-full bottom-0 z-0"/>
                                    <h1 className="text-bold text-xl absolute left-2 bottom-2 text-white z-10">{union.name}</h1>

                                </div>
                                <div className="flex gap-2 flex-col text-center px-4  pt-2 h-24">
                                    <p className="line-clamp-3">{union.description}</p>
                                </div>
                            </a>
                        </Link>
                    );
                })
                }
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
export default UnionsList;