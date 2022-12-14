import Link from "next/link";
import { FC, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import SignInModal from "./signInModal";
import { useTranslation } from "next-i18next";
import Button from "./Button";
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
      <nav className="sticky top-0 z-20 dark:bg-black dark:text-white border-b border-b-neutral-100 dark:shadow-none bg-white h-16  justify-between items-center px-10 w-screen flex  ">
        <div className="flex">
          <Link href="/" className="text-3xl font-medium select-none mr-16">
            Rhea.
          </Link>
          <div className="w-px bg-black/25 my-1 dark:bg-white/50  hidden lg:flex   " />
          <div className=" items-center gap-8 ml-16 hidden lg:flex">
            <Link href={"/unions"} className="font-medium hover:underline focus:underline select-none">
              {t("unions")}
            </Link>
            <Link href={"/map"} className="font-medium hover:underline focus:underline select-none">
              {t("map")}
            </Link>
            <Link href={"/courses"} className="font-medium hover:underline focus:underline select-none">
              {t("schedule")}
            </Link>
            <Link href={"/rooms"} className="font-medium hover:underline focus:underline select-none">
              {t("rooms")}
            </Link>
            <Link href={"/about"} className="font-medium hover:underline focus:underline select-none">
              {t("about")}
            </Link>
          </div>
        </div>
        <div className=" hidden lg:flex gap-4">
          <Button buttonType="link" buttonStyle="outlined" href="/courses" >
            {t("findCourses")}
          </Button>
          {user ? <Button buttonType="link" buttonStyle="outlined" href="/user" >
            {t("profile")}
          </Button> : (
            <Button onClick={() => setShowSignInModal(true)} buttonStyle="filled"  >
              {t("signIn")}
            </Button>
          )}
        </div>
        <div className="flex lg:hidden hover:bg-black hover:text-white rounded-xl px-2 py-2 cursor-pointer duration-300">
          <Bars3Icon onClick={() => setShowSmallScreenMenu(true)} className="h-8 w-8 " />
        </div>
      </nav>
      <Transition.Root show={showSmallScreenMenu} className="lg:hidden flex" >

        <Transition.Child
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="div"
          onClick={() => setShowSmallScreenMenu(false)}
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
                <Link onClick={() => setShowSmallScreenMenu(false)} href={"/unions"} className="font-medium hover:underline focus:underline select-none">
                  {t("unions")}
                </Link>
                <Link onClick={() => setShowSmallScreenMenu(false)} href={"/map"} className="font-medium hover:underline focus:underline select-none">
                  {t("map")}
                </Link>
                <Link onClick={() => setShowSmallScreenMenu(false)} href={"/courses"} className="font-medium hover:underline focus:underline select-none">
                  {t("schedule")}
                </Link>

                <Link onClick={() => setShowSmallScreenMenu(false)} href={"/rooms"} className="font-medium hover:underline focus:underline select-none">
                  {t("rooms")}
                </Link>
                <Link onClick={() => setShowSmallScreenMenu(false)} href={"/about"} className="font-medium hover:underline focus:underline select-none">
                  {t("about")}
                </Link>
              </div>
              <div className="flex  gap-4 p-4">
                <Button buttonType="link" onClick={() => {
                  setShowSmallScreenMenu(false)
                }}
                  className="flex-1 text-center" buttonStyle="outlined" href="/courses" >
                  {t("findCourses")}
                </Button>
                {user ? <Button buttonType="link" className="flex-1" onClick={()=>setShowSmallScreenMenu(false)} buttonStyle="outlined" href="/user" >
                  {t("profile")}
                </Button> : (
                  <Button className="flex-1" onClick={() => {
                    
                    setShowSignInModal(true);
                    setShowSmallScreenMenu(false);
                  }} buttonStyle="filled"  >
                    {t("signIn")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Transition.Child>

      </Transition.Root>
    </>
  );
};

export default Header;
