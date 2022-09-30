import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
import CallToAction from '../components/splash/callToAction'
import Mock from '../components/splash/mock'
const Home: NextPage = () => {
  const [issues, setIssues] = useState<string[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    fetch('/api/status').then((data) => {
      data.json().then((data) => {
        setIssues(data.issues.map((issue: any) => issue.issue))
      }).catch(()=>{
	console.debug("No issues");
	})
    })
  }, [])


  return (


    <div className='flex justify-center items-center flex-1 bg-splash dark:bg-splash-dark '>
    <div className='max-w-7xl w-full flex items-center'>
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
