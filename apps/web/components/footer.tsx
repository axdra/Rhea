import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC } from "react";


const Footer: FC = () => {
    const { t } = useTranslation();

    return <>
        <div className=" dark:bg-black dark:border-t dark:border-t-white bg-white h-24 shadow  justify-between items-center px-10 w-screen  z-10 sm:flex hidden ">
                                <div className="flex items-center justify-center flex-1">
                                 <Link
                                     href={'/about'}
                                     className="text-white-500 hover:underline transition-colors">{t('about')}</Link>
                                </div>

        </div>

    </>;
};

export default Footer;