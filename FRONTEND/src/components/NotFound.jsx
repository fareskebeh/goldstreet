import React from 'react'
import { Link } from 'react-router-dom'
import {HiExternalLink} from "react-icons/hi"

const NotFound = () => {
  return (
    <div className='text-center absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 text-white  justify-center items-center'>
      <p className='text-8xl font-bold'>404</p>
      <p className='text-gray-400 text-xl'>We could not find what you're looking for</p>
      <Link className='flex gap-2 items-center underline transition-all duration-100 hover:text-blue-500' to="/">Go to home <HiExternalLink/></Link>
    </div>
  )
}

export default NotFound
