import React from 'react'
import { Button } from 'flowbite-react'

const CallToAction = () => {
  return (
    <div className='p-3 flex flex-col sm:flex-row border border-teal-500 rounded-tl-3xl rounded-br-3xl justify-center items-center text-center'>
        <div className='flex-1 flex flex-col justify-center'>
            <h2 className='text-2xl'>Want to learn more about javascript </h2>
            <p className='my-2 text-gray-500'>Checkout these resources with 100 js projects</p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>100 Javascript Projects</a>
            </Button>
        </div>
        <div className='flex-1 p-7'>
            <img src="https://codingartistweb.com/wp-content/uploads/2022/09/100-JS-Projects-Part-1-01.png" alt="" />
        </div>
    </div>
  )
}

export default CallToAction