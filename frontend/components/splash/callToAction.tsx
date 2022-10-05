import { useTranslation } from "next-i18next";
import { FC, useState } from "react";
import Button from "../Button";
import LinkButton from "../LinkButton";
import SignInModal from "../signInModal";

const CallToAction: FC = () => {

    const { t } = useTranslation();
    const [signInModalOpen,setSignInModalOpen ] = useState(false);
    return (
        <>
        <SignInModal isOpen={signInModalOpen} setIsOpen={setSignInModalOpen}/>
        <div className="flex flex-col justify-center lg:h-full lg:flex-1 h-[calc(100vh-4rem)] dark:text-white ">
            <h1 className="text-6xl font-medium">
                Rhea.
            </h1>
            <h3 className="text-lg font-medium mt-2">
                {t('callToActionh1')}
            </h3>
            <p className="text-xl font-medium mt-1">
                {t('callToActionp1')}
                
            </p>
            <p className="text-xl font-medium">
                {t('callToActionp2')}
                
            </p>
            <p className="text-xl font-medium">
                {t('callToActionp3')}
                
            </p>
            <div className="flex gap-4 mt-8">
                <LinkButton  buttonStyle="outlined" href="/courses" >
                    {t("findCourses")}
                </LinkButton>
                <Button  onClick={()=>setSignInModalOpen(true)} buttonStyle="filled"  >
                    {t("signIn")}
                </Button>
            </div>
        </div>
        </>
    );
}
    
export default CallToAction;