import { Dialog, Transition } from "@headlessui/react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import SearchBar from "./searchBar";
import { FaApple, FaMicrosoft,FaGithub, FaGoogle } from 'react-icons/fa';
import { MapIcon } from "@heroicons/react/24/solid";
import SignInModal from "./signInModal";
import UserProfileDropDown from "./userProfileDropDown";
import { useTranslation } from "next-i18next";

const Header: FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="sticky top-0 dark:bg-black dark:text-white dark:border-b-white dark:border-b dark:shadow-none bg-white h-16 shadow-sm  justify-between items-center px-10 w-screen z-10 sm:flex hidden ">
                <Link href="/"><a ><h1>{t('title')}</h1></a></Link>
                <div className=" gap-4  flex ">
<div className="hidden md:block">
                    <SearchBar />
                    </div>
                    <Link href={"/map"}><a className="rounded-full py-2 px-6 bg-orange-500 text-white shadow cursor-pointer hover:bg-orange-600 transition-colors  flex items-center gap-2" ><span className="sm:block hidden">{t('map')}</span> <MapIcon className="h-5 w-5" /> </a></Link>
                   <UserProfileDropDown/>
            </div>
            </div>
           
        </>
    )
};
        
export default Header;