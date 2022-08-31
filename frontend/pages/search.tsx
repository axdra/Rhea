import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Search: NextPage = () => {
    //get search query from url
    const router = useRouter();
    const searchQuary = router.query.q as string;
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/search?q=' + searchQuary).then
            (res => res.json()).then(data => {

                setCourses(data);
            }
        ).finally(() => {
            setLoading(false);
        }
        )
    }
        , [searchQuary]);
    console.log(courses.length);
    return (
        <div className="max-w-6xl mx-auto md:mt-12 mt-4 md:px-24 px-4 py-10 shadow rounded-lg mb-24  ">
            <div >
            <h1 className="text-4xl font-medium mb-5 xl:w-[72rem] transition-all">Search results for {searchQuary}</h1>
           
            {courses.length === 0 && !loading &&  <div className="text-center">No results found</div>}
            <ul className="flex flex-col gap-5">
                {courses.map(course => <li key={course.code}
                    className="flex sm:flex-row gap-6 flex-col items-center justify-between border rounded-lg border-gray-200 bg-gray-50 py-5 px-4 shadow-sm sm:gap-2">
                    <div>
                        <h2>
                            {course.name}
                        </h2>
                        <h3 className="font-medium">
                            {course.code}
                        </h3>
                    </div>
                    <div >
                        <Link href={{
                            pathname: "/course",
                            query: {
                                q: course.code
                            }
                        }}><a className="text-orange-500 hover:text-orange-700 py-2 px-5 bg-white shadow rounded-full  whitespace-nowrap ">Go to Course</a></Link>
                </div>
                </li>)}
            </ul>
            </div>
        </div>
    );
}
export default Search;