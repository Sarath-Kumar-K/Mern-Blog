import React from 'react'
import CallToAction from '../components/CallToAction';

const Projects = () => {
  return (
    <div className='p-3 max-w-2xl min-h-screen mx-auto flex flex-col gap-6 items-center justify-center'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500'>Build fun and engaging projects while learning HTML, CSS and Javascript!</p>
      <CallToAction />
    </div>
  )
}

export default Projects