import { useRouter } from "next/router";
import { FC, FormEvent, FormEventHandler, useState } from "react";

const SearchBar: FC = () => {
    const router = useRouter()
    const [searchQuary, setSearchQuary] = useState("")
    const search = (e: FormEvent) => {

        e.preventDefault();
        //redirect to next search page
        
        router.push(`/search?q=${searchQuary}`)
    }
    return <form onSubmit={search}>
    <input type="text" value={searchQuary} onChange={(e)=>setSearchQuary(e.currentTarget.value)} name="searchquary" className="rounded-full border-gray-300 placeholder:text-gray-300 focus:ring-orange-500 focus:border-orange-500 shadow-sm" placeholder="Search" />
    </form>
}
export default SearchBar;
