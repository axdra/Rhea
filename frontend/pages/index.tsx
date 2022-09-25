import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
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


    <div className='flex justify-center items-center flex-1 '>
      <div className='w-full max-w-2xl'>
        <div className='bg-white md:shadow-md rounded px-8 pt-6 pb-8 mb-4 relative '>
          <div className='h-4 w-4 bg-orange-500 animate-ping rounded-full left-4  md:left-auto md:-right-2 -top-2 absolute '></div>
          <div className='h-4 w-4  bg-orange-500 rounded-full left-4 md:left-auto  md:-right-2 -top-2 absolute group'>
            <div className='px-4 py-4 rounded-lg bg-white hidden  shadow absolute group-hover:block w-64 md:-left-32 top-3'>
              <h1 className='font-bold'>
                {t('stilInDevelopment')}
              </h1>
              <p>
                {t('stilInDevelopmentMessage')}

              </p>
            </div>
          </div>
          <div className='mb-4'>
            <h1 className='text-2xl font font-medium'>
              {t('title')}
            </h1>
            <p className='text-gray-700 text-base mt-4'>
              {t('description1')}

            </p>
            <p className='text-gray-700 text-base mt-4'>
              {t('description2')}

            </p>
            <p className='text-gray-700 text-base mt-4'>
              {t('description3')}
            </p>
            <div className='flex justify-center items-center mt-4'>
              <SearchBar />
            </div>
            {issues.length > 0 && (
              <><h5 className='text-lg text-red-500 mt-4 font-bold flex items-center gap-2'>
                <ExclamationTriangleIcon className='h-5 w-5 ' /> {t('knownIssues')}
              </h5>

                <ul>
                  {issues.map((issue,index) => (
                    <li key={index}>
                      <span className='flex gap-2'>-
                        <p className='text-gray-700 text-base '>
                          {issue}
                        </p></span>
                    </li>
                  ))}

                </ul></>
            )}
          </div>

        </div>
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
