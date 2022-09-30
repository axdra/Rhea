import Link from "next/link";
import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import SearchBar from "./searchBar";
import { FaApple, FaMicrosoft, FaGithub, FaGoogle } from "react-icons/fa";
import { MapIcon } from "@heroicons/react/24/solid";
import SignInModal from "./signInModal";
import UserProfileDropDown from "./userProfileDropDown";
import { useTranslation } from "next-i18next";
import Button from "./Button";
import LinkButton from "./LinkButton";

const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <nav className="sticky top-0 dark:bg-black dark:text-white dark:border-b-white dark:border-b dark:shadow-none bg-white h-16 shadow-sm  justify-between items-center px-10 w-screen z-10 sm:flex hidden ">
        <div className="flex ">
          <Link href="/" className="text-3xl font-medium select-none mr-16">
            Rhea.
          </Link>
          <div className="w-px bg-black/25 my-1 " />
          <div className="flex items-center gap-8 ml-16">
          <Link href={"/unions"} className="font-medium hover:underline focus:underline select-none">
            {t("unions")}
          </Link>
          <Link href={"/map"} className="font-medium hover:underline focus:underline select-none">
            {t("map")}
          </Link>
          <Link href={"/schedule"} className="font-medium hover:underline focus:underline select-none">
            {t("schedule")}
          </Link>
          <Link href={"/about"} className="font-medium hover:underline focus:underline select-none">
            {t("about")}
          </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <LinkButton buttonStyle="outlined" href="/courses" >
            {t("findCourses")}
          </LinkButton>
          <Button buttonStyle="filled"  >
            {t("signIn")}
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Header;
