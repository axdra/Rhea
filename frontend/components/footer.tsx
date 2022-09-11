import Link from "next/link";
import { FC } from "react";


const Footer: FC = () => {

    return (
        <>
            <div className=" bg-white h-24 shadow flex justify-between items-center px-10 w-screen  z-10 ">
                                    <div className="flex items-center justify-center flex-1">
                                     <Link href={'/about'}><a className="text-orange-500 hover:underline hover:text-orange-600 transition-colors">About</a></Link>
                                    </div>

            </div>

        </>
    )
};

export default Footer;