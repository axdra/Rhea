import { useTranslation } from "next-i18next";
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
    const { t } = useTranslation();

    return <form onSubmit={search}>
    <input type="text" value={searchQuary} onChange={(e)=>setSearchQuary(e.currentTarget.value)} name="searchquary" className="dark:text-white rounded-full border-gray-300 placeholder:text-gray-300 focus:ring-white focus:border-white shadow-sm" placeholder={t('search')} />
    </form>
}
export default SearchBar;
