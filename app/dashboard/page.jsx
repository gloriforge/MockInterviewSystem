// Setting the main dashboard
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-220px)] p-10">
      {/* <div className="flex-grow"> */}

      <h2 className='font-bold text-3xl text-black'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start your AI Mockup Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5 gap-5'>
        <AddNewInterview />
      </div>

      {/* Previous Interview List  */}
      <InterviewList />
    </div>
    // </div>
  )
}

export default Dashboard