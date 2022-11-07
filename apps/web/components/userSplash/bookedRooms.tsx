import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC } from "react";
import LinkButton from "../LinkButton";


const BookedRooms: FC = () => {
    const { t } = useTranslation();

    return <div className="px-4 py-2  pb-6 flex flex-col flex-1" >
        <h1 className='text-2xl font-medium'>{t('bookedRooms')}</h1>
        <div className='flex flex-row flex-1 justify-center items-center'>
            {t('noBookedRooms')}
        </div>
        <LinkButton buttonStyle="ghost"  href={"/rooms"} >
                    {t('manageBookings')}
                    </LinkButton>
    </div>

};

export default BookedRooms;