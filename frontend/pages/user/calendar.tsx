import { NextPage } from "next";
import Link from "next/link";

const UserCalendar: NextPage = () => {

    return (
        <div className="h-full flex flex-col justify-center items-center flex-1">
            <h1>User Calendar</h1>
            <Link href="/">
                <a className="hover:underline text-orange-500">Go back home</a>
            </Link>
        </div>
    );
}
export default UserCalendar;