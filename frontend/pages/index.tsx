import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSessionContext, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
import CallToAction from '../components/splash/callToAction'
import Mock from '../components/splash/mock'
import TodaysSchedule from '../components/userSplash/todaysSchedule'
import Greet from '../utils/greeting'
const Home: NextPage = () => {
  const [issues, setIssues] = useState<string[]>([])
  const { t } = useTranslation()
  const user = useUser()
  useEffect(() => {
    fetch('/api/status').then((data) => {
      data.json().then((data) => {
        setIssues(data.issues.map((issue: any) => issue.issue))
      }).catch(()=>{
	console.debug("No issues");
	})
    })
  }, [])

  if (user) {
    return <div className='flex justify-center pt-24 flex-1 bg-splash dark:bg-splash-dark pb-20  '>
      <div className='max-w-[100rem] w-full flex  px-4 flex-col gap-10 ' >
        <h1 className='text-5xl font-medium'>{Greet(user.email!, t)}</h1>
        <div className='grid grid-cols-5 w-full flex-1 gap-5'>
          <div className='col-span-1 border-black border-2 bg-white h-96 rounded-xl flex flex-col'>
            <TodaysSchedule/>
          </div>
          <div className='col-span-1 border-black border-2 bg-white h-96 rounded-xl'>
          </div>
          <div className='col-span-3 border-black border-2 bg-white h-96 rounded-xl'>

          </div>
        </div>
      </div>
    </div>
  }
  return (


    <div className='flex justify-center items-center flex-1 bg-splash dark:bg-splash-dark pb-20 '>
    <div className='max-w-7xl w-full flex items-center px-4 flex-col lg:flex-row' >
      <CallToAction />
        <Mock />
      </div>
    </div>
  )
}
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default Home
