import { NextPage } from "next";
import Link from "next/link";

const fourOFour: NextPage = () => {

    return (
        <div className="h-full flex flex-col justify-center items-center flex-1">
            <p>Created by <a className="text-orange-500 hover:underline hover:text-orange-600" href="https://axeldraws.com">Axel Draws</a></p>
            <p>With help from <a className="text-orange-500 hover:underline hover:text-orange-600" href="https://linkedin.com/in/oskar-sturebrand-aa73b7219">Oskar Sturebrand</a> creating maps.</p>
        </div>
    );
}
export default fourOFour;