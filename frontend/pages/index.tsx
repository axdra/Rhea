import { User } from '@supabase/supabase-js'
import { Auth } from '@supabase/ui'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
import { supabase } from '../utils/supabaseClient'
const Home: NextPage = () => {


  return (
    <div className='flex justify-center items-center flex-1'>
      <div className='w-full max-w-2xl'>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <h1 className='text-2xl font font-medium'>
              MDU Schema
            </h1>
            <p className='text-gray-700 text-base'>
              You can search for any course by name or course code
            </p>
            <p>
              If you sign in you can can add courses to your schedule and subscribe to a custom schedule feed
            </p>
            <p>
              Of course you can view a single course and subscribe to it{"'"}s schedule feed. Contrariety to kronox this subscription does update regularly in your calendar automatically.  
            </p>
          </div>
          <div className='flex justify-center items-center'>
            <SearchBar/>
          </div>
        </div>
        </div>
     
    </div>
  )
}

export default Home
