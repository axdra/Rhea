import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Search: NextPage = () => {
    //get search query from url
    const router = useRouter();
    const course = router.query.q as string;


    return (
        <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow rounded-lg mb-24  ">
            <div >
                <h1 className="text-4xl font-medium mb-5 xl:w-[72rem] transition-all">{ course}</h1>
                
            </div>
        </div>
    );
}
export default Search;