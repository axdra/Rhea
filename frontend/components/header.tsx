import Link from "next/link";
import { FC, useState } from "react";
import SearchBar from "./searchBar";
import { FaApple, FaMicrosoft, FaGithub, FaGoogle } from "react-icons/fa";
import { Bars3Icon, MapIcon } from "@heroicons/react/24/solid";
import SignInModal from "./signInModal";
import UserProfileDropDown from "./userProfileDropDown";
import { useTranslation } from "next-i18next";
import Button from "./Button";
import LinkButton from "./LinkButton";
import { Transition } from "@headlessui/react";
import { useUser } from "@supabase/auth-helpers-react";

const Header: FC = () => {
  const { t } = useTranslation();
  const [showSmallScreenMenu, setShowSmallScreenMenu] = useState(false);
  const user = useUser();
  const [showSignInModal, setShowSignInModal] = useState(false);
  return (
    <>
      <SignInModal isOpen={showSignInModal} setIsOpen={setShowSignInModal} />
      <nav className="sticky top-0 dark:bg-black dark:text-white dark:border-b-white dark:border-b dark:shadow-none bg-white h-16 shadow-sm  justify-between items-center px-10 w-screen z-10 flex  ">
        <div className="flex">
          <Link href="/" className="text-3xl font-medium select-none mr-16">
            Rhea.
          </Link>
          <div className="w-px bg-black/25 my-1  hidden lg:flex   " />
          <div className=" items-center gap-8 ml-16 hidden lg:flex">
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
        <div className=" hidden lg:flex gap-4">
          <LinkButton buttonStyle="outlined" href="/courses" >
            {t("findCourses")}
          </LinkButton>
          {user ? <LinkButton buttonStyle="outlined" href="/user" >
            {t("profile")}
          </LinkButton> :(
              <Button onClick={() => setShowSignInModal(true)} buttonStyle="filled"  >
            {t("signIn")}
            </Button>
        )    }
        </div>
        <div className="flex lg:hidden">
          <Bars3Icon onClick={()=>setShowSmallScreenMenu(true)}  className="h-8 w-8" />
        </div>
      </nav>
      <Transition.Root show={showSmallScreenMenu} className="md:hidden flex" >

        <Transition.Child
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="div"
          onClick={()=>setShowSmallScreenMenu(false)}
        >
          <div className="fixed inset-0 bg-black/25 z-10" />
        </Transition.Child>
        <Transition.Child
          enter="transition-all duration-500 transform"
          enterFrom="-translate-y-72"
          enterTo="translate-y-0"
          leave="transition-all duration-500 transform"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-72"
          as="div"
          className="fixed w-full ease-in-out bg-white dark:bg-black dark:text-white z-50 top-0 "
        >
            <div className="flex flex-col h-full">
            <div className="flex flex-col justify-between h-full">
              
                <div className="flex flex-col gap-4 p-4">
                <Link href="/" className="text-3xl font-medium select-none mr-16">
                  Rhea.
                </Link>
                  <Link onClick={()=>setShowSmallScreenMenu(false)} href={"/unions"} className="font-medium hover:underline focus:underline select-none">
                    {t("unions")}
                  </Link>
                  <Link onClick={()=>setShowSmallScreenMenu(false)} href={"/map"} className="font-medium hover:underline focus:underline select-none">
                    {t("map")}
                  </Link>
                  <Link onClick={()=>setShowSmallScreenMenu(false)} href={"/schedule"} className="font-medium hover:underline focus:underline select-none">
                    {t("schedule")}
                  </Link>

                  <Link onClick={()=>setShowSmallScreenMenu(false)} href={"/about"} className="font-medium hover:underline focus:underline select-none">
                    {t("about")}
                  </Link>
                </div>
                <div className="flex  gap-4 p-4">
                  <LinkButton className="flex-1 text-center" buttonStyle="outlined" href="/courses" >
                    {t("findCourses")}
                  </LinkButton>
                  <Button buttonStyle="filled" className="flex-1 text-center"  >
                    {t("signIn")}
                  </Button>
                </div>
              </div>
            </div>
        </Transition.Child>

      </Transition.Root>
    </>
  );
};

export default Header;
