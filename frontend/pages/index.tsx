import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
const Home: NextPage = () => {
  const [issues, setIssues] = useState<string[]>([])
  useEffect(() => {
    fetch('/api/status').then((data) => {
      data.json().then((data) => {
        setIssues(data.issues.map((issue: any) => issue.issue))
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
                Still in development
              </h1>
              <p>
                This is a work in progress, there is for sure going to be some bugs.
              </p>
            </div>
          </div>
          <div className='mb-4'>
            <h1 className='text-2xl font font-medium'>
              MDU Schema
            </h1>
            <p className='text-gray-700 text-base mt-4'>
              You can search for any course by name or course code
            </p>
            <p className='text-gray-700 text-base mt-4'>
              If you sign in you can can add courses to your schedule and subscribe to a custom schedule feed
            </p>
            <p className='text-gray-700 text-base mt-4'>
              Of course you can view a single course and subscribe to it{"'"}s schedule feed. Contrariety to kronox this subscription does update regularly in your calendar automatically.
            </p>
            <div className='flex justify-center items-center mt-4'>
              <SearchBar />
            </div>
            {issues.length > 0 && (
              <><h5 className='text-lg text-red-500 mt-4 font-bold flex items-center gap-2'>
                <ExclamationTriangleIcon className='h-5 w-5 ' /> Known issues
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

export default Home
