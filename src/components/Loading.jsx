import React from 'react'
import loader from "../assets/loader.svg"

function Loading() {
  return (
    <div className='flex justify-center items-center h-full'>
      {/* <div className="animate-spin border-4 border-t-transparent w-10 h-10 scale-200 rounded-full border-red-300"></div> */}
      <img src={loader} alt="" />
    </div>
  )
}

export default Loading
