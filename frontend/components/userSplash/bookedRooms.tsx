import { useTranslation } from "next-i18next";
import { FC } from "react";


const BookedRooms: FC = () => {
    const { t } = useTranslation();

    return <div className="px-4 py-2 flex flex-col flex-1" >
        <h1 className='text-2xl font-medium'>{t('bookedRooms')}</h1>


    </div>

};

export default BookedRooms;