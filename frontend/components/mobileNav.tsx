import { Dialog, Transition } from "@headlessui/react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import SearchBar from "./searchBar";
import { FaApple, FaMicrosoft, FaGithub, FaGoogle } from "react-icons/fa";
import SignInModal from "./signInModal";
import UserProfileDropDown from "./userProfileDropDown";
import {
  HomeIcon,
  MapIcon,
  UserIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconFilled,
  MapIcon as MapIconFilled,
  UserIcon as UserIconFilled,
  QuestionMarkCircleIcon as QuestionMarkCircleIconFilled,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const MobileNav: FC = () => {
  const router = useRouter();

  return (
    <>
      <div className="fixed bottom-0 bg-white h-16 shadow-sm  justify-between items-center px-10 w-screen z-10 sm:hidden flex border-t border-t-gray-100 dark:bg-black dark:text-white ">
        <Link href="/">
          {router.pathname === "/" ? (
            <HomeIconFilled className="h-6 w-6 stroke-2 group-active:fill-orange-500 text-orange-500" />
          ) : (
            <HomeIcon className="h-6 w-6 stroke-2 group-active:fill-orange-500 text-orange-500" />
          )}
        </Link>
        <Link href="/map">
          {router.pathname.startsWith("/map") ? (
            <MapIconFilled className="h-6 w-6 stroke-2 group-active:fill-orange-500 text-orange-500" />
          ) : (
            <MapIcon className="h-6 w-6 stroke-2 group-active:fill-orange-500 text-orange-500" />
          )}
        </Link>
        <Link href="/user">
          {router.pathname.startsWith("/user") ? (
            <UserIconFilled className="h-6 w-6 stroke-2 group-active:fill-orange-500 text-orange-500" />
          ) : (
            <UserIcon className="h-6 w-6 stroke-2 group-active:fill-orange-500 text-orange-500" />
          )}
        </Link>
        <Link href="/about">
          {router.pathname.startsWith("/about") ? (
            <QuestionMarkCircleIconFilled className="h-6 w-6 stroke-2 group-active:fill-orange-500 text-orange-500" />
          ) : (
            <QuestionMarkCircleIcon className="h-6 w-6 stroke-2 group-active:fill-orange-500 text-orange-500" />
          )}
        </Link>
      </div>
    </>
  );
};

export default MobileNav;
